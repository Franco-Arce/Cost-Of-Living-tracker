import { useState, useEffect } from 'react';
import { metricsService } from './services/api';
import KPICards from './components/KPICards';
import Sidebar from './components/Sidebar';
import PurchasingPowerChart from './components/PurchasingPowerChart';
import CostVsSalaryChart from './components/CostVsSalaryChart';
import HoursToEarnChart from './components/HoursToEarnChart';

function App() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    // Update filtered data when selection changes
    useEffect(() => {
        if (selectedCountries.length === 0) {
            setFilteredData(data);
        } else {
            setFilteredData(metricsService.filterByCountries(data, selectedCountries));
        }
    }, [selectedCountries, data]);

    const loadData = async () => {
        try {
            setLoading(true);
            const metrics = await metricsService.getMetrics();
            setData(metrics);
            setFilteredData(metrics);

            const countries = metricsService.getUniqueCountries(metrics);
            setAllCountries(countries);
            setSelectedCountries(countries); // Select all by default

            setError(null);
        } catch (err) {
            setError('Failed to load data. Please ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 mx-auto"></div>
                    <p className="text-xl text-white/80">Loading data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="card-glass max-w-md text-center space-y-4">
                    <div className="text-6xl">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-400">Error</h2>
                    <p className="text-white/80">{error}</p>
                    <button onClick={loadData} className="btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background particles */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-2 h-2 bg-violet-500 rounded-full animate-float opacity-60"></div>
                <div className="absolute top-40 right-40 w-3 h-3 bg-fuchsia-500 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-60 w-2 h-2 bg-cyan-500 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-60 right-20 w-2 h-2 bg-pink-500 rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    allCountries={allCountries}
                    selectedCountries={selectedCountries}
                    onCountriesChange={setSelectedCountries}
                />

                {/* Main Content */}
                <main className="flex-1 p-12 ml-96 h-screen overflow-y-auto custom-scrollbar">
                    {/* Enhanced Header */}
                    <header className="mb-16 relative">
                        {/* Glow effect behind title */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 blur-3xl opacity-20 animate-pulse-glow"></div>

                        <div className="relative z-10">
                            <h1 className="text-7xl font-black text-gradient glow-strong mb-6 animate-fade-in-up">
                                🌍 Global Living Cost Tracker
                            </h1>
                            <p className="text-2xl text-violet-200/90 max-w-4xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                Discover the <span className="text-gradient-alt font-bold">Real Purchasing Power</span> across the world's cities.
                                Compare living costs, salaries, and work hours needed for a comfortable life.
                            </p>
                        </div>

                        {/* Decorative line */}
                        <div className="mt-8 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent rounded-full"></div>
                    </header>

                    {/* KPI Cards */}
                    <KPICards data={filteredData} />

                    {/* Divider with gradient */}
                    <div className="my-16 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

                    {/* Charts */}
                    <div className="space-y-16">
                        <PurchasingPowerChart data={filteredData} />
                        <CostVsSalaryChart data={filteredData} />
                        <HoursToEarnChart data={filteredData} />
                    </div>

                    {/* Footer */}
                    <footer className="mt-20 text-center pb-8">
                        <div className="inline-block bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-violet-500/30">
                            <p className="text-violet-300/80 text-sm">
                                <span className="text-gradient-alt font-bold">Data source:</span> Numbeo •
                                <span className="text-violet-200 font-semibold"> Calculated automatically</span>
                            </p>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}

export default App;
