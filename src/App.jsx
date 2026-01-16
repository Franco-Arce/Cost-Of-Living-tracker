import { useState, useEffect } from 'react';
import { metricsService } from './services/api';
import { useLanguage } from './i18n/LanguageContext';
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
    const { language, toggleLanguage, t } = useLanguage();

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
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600 mx-auto"></div>
                    <p className="text-xl text-slate-300">Loading cost of living data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="card-glass max-w-md text-center space-y-4">
                    <div className="text-5xl">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-400">Connection Error</h2>
                    <p className="text-slate-300">{error}</p>
                    <button onClick={loadData} className="btn-primary">
                        Retry Connection
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
                <main className="flex-1 p-6 ml-96 h-screen overflow-y-auto custom-scrollbar">
                    {/* Corporate Header */}
                    <header className="mb-8 pb-6 border-b border-slate-800/60">
                        <div className="flex items-baseline justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold text-slate-100 mb-2 tracking-tight">
                                    {t('title')}
                                </h1>
                                <p className="text-sm text-slate-400 max-w-2xl">
                                    {t('subtitle')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Language Switcher */}
                                <button
                                    onClick={toggleLanguage}
                                    className="px-3 py-1.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-md text-xs font-medium transition-all flex items-center gap-2"
                                    title={t('language')}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                    {language.toUpperCase()}
                                </button>
                                <div className="badge">
                                    {filteredData.length} {t('citiesCount')}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* KPI Cards */}
                    <KPICards data={filteredData} />

                    {/* Divider */}
                    <div className="my-8 h-px bg-slate-800/40"></div>

                    {/* Data Visualizations */}
                    <div className="space-y-8">
                        <PurchasingPowerChart data={filteredData} />
                        <CostVsSalaryChart data={filteredData} />
                        <HoursToEarnChart data={filteredData} />
                    </div>

                    {/* Footer */}
                    <footer className="mt-12 pt-6 border-t border-slate-800/40">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <div>
                                <span className="font-medium text-slate-400">{t('dataSource')}:</span> Numbeo
                            </div>
                            <div>
                                {t('lastUpdated')}: {new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}

export default App;
