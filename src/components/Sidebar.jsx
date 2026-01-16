import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Sidebar({ allCountries, selectedCountries, onCountriesChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useLanguage();

    const filteredCountries = allCountries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleCountry = (country) => {
        if (selectedCountries.includes(country)) {
            onCountriesChange(selectedCountries.filter(c => c !== country));
        } else {
            onCountriesChange([...selectedCountries, country]);
        }
    };

    const selectAll = () => {
        onCountriesChange(allCountries);
    };

    const deselectAll = () => {
        onCountriesChange([]);
    };

    return (
        <aside className="sidebar fixed left-0 top-0 h-screen w-96 p-5 overflow-y-auto custom-scrollbar z-50">
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-slate-800/60">
                <h2 className="text-lg font-semibold text-slate-100 mb-1">
                    {t('countryFilter')}
                </h2>
                <p className="text-xs text-slate-500">
                    {t('selectCountries')}
                </p>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/50 rounded-md text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-800/50 focus:border-violet-800/50 transition-all"
                />
            </div>

            {/* Select All / Clear buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={selectAll}
                    className="flex-1 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-md text-xs font-medium transition-all"
                >
                    {t('selectAll')}
                </button>
                <button
                    onClick={deselectAll}
                    className="flex-1 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-md text-xs font-medium transition-all"
                >
                    {t('clear')}
                </button>
            </div>

            {/* Country List */}
            <div className="space-y-1">
                {filteredCountries.map((country) => {
                    const isSelected = selectedCountries.includes(country);

                    return (
                        <label
                            key={country}
                            className={`
                                flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-all text-sm
                                ${isSelected
                                    ? 'bg-violet-900/30 border border-violet-800/50 text-slate-100'
                                    : 'bg-slate-900/20 border border-slate-800/30 text-slate-400 hover:bg-slate-900/40 hover:border-slate-700/50 hover:text-slate-300'
                                }
                            `}
                        >
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleCountry(country)}
                                className="w-4 h-4 rounded border-slate-600 bg-slate-800/50 checked:bg-violet-800 checked:border-violet-700 focus:ring-1 focus:ring-violet-800/50 focus:ring-offset-0 cursor-pointer transition-all"
                            />

                            {/* Country name */}
                            <span className="font-medium flex-1">
                                {country}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* Selected Count */}
            <div className="mt-6 pt-4 border-t border-slate-800/60">
                <div className="bg-slate-900/40 rounded-md p-3 border border-slate-800/50">
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-bold text-slate-100 tabular-nums">
                            {selectedCountries.length}
                        </span>
                        <span className="text-slate-500 text-sm">/</span>
                        <span className="text-slate-400 text-sm tabular-nums">
                            {allCountries.length}
                        </span>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-1">
                        {t('selected')}
                    </p>
                </div>
            </div>
        </aside>
    );
}
