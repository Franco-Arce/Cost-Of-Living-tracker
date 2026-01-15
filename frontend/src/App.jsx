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
        <div className="min-h-screen">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    allCountries={allCountries}
                    selectedCountries={selectedCountries}
                    onCountriesChange={setSelectedCountries}
                />

                {/* Main Content */}
                <main className="flex-1 p-8 ml-80 h-screen overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-5xl font-bold text-gradient glow mb-4">
                            🌍 Global Cost of Living Tracker
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl">
                            Compare the <span className="text-primary-400 font-semibold">Real Purchasing Power</span> between different cities worldwide.
                            See how many hours of work are needed to buy a basic basket of goods based on local salaries.
                        </p>
                    </header>

                    {/* KPI Cards */}
                    <KPICards data={filteredData} />

                    {/* Divider */}
                    <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    {/* Charts */}
                    <div className="space-y-12">
                        <PurchasingPowerChart data={filteredData} />
                        <CostVsSalaryChart data={filteredData} />
                        <HoursToEarnChart data={filteredData} />
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 text-center text-white/50 text-sm">
                        <p>Data source: Numbeo • Calculated automatically</p>
                    </footer>
                </main>
            </div>
        </div>
    );
}

export default App;
