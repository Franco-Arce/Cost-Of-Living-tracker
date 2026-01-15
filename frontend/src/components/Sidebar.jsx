import { useState } from 'react';
import { getCountryFlag, getCountryGradient } from '../utils/countryUtils';

export default function Sidebar({ allCountries, selectedCountries, onCountriesChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);

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
        <aside className="fixed left-0 top-0 h-screen w-96 bg-gradient-to-b from-slate-950/98 via-indigo-950/95 to-slate-950/98 backdrop-blur-3xl border-r border-violet-500/30 p-6 overflow-y-auto custom-scrollbar shadow-2xl shadow-violet-500/20 z-50">
            {/* Header with glow effect */}
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-3xl opacity-20 animate-pulse-glow"></div>
                <h2 className="text-3xl font-black text-gradient glow-strong mb-3 relative z-10">
                    🌍 Country Selector
                </h2>
                <p className="text-sm text-violet-300/80 relative z-10">
                    Choose countries to compare their living costs
                </p>
            </div>

            {/* Search with icon */}
            <div className="mb-6 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                    <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-4 py-4 bg-white/10 border-2 border-violet-500/30 rounded-2xl text-white placeholder-violet-300/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all backdrop-blur-xl font-medium"
                    />
                </div>
            </div>

            {/* Select All / Clear buttons with gradient */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={selectAll}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
                >
                    ✓ Select All
                </button>
                <button
                    onClick={deselectAll}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-xl text-sm font-bold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                >
                    ✕ Clear
                </button>
            </div>

            {/* Country List with flags and animations */}
            <div className="space-y-2">
                {filteredCountries.map((country, index) => {
                    const isSelected = selectedCountries.includes(country);
                    const flag = getCountryFlag(country);
                    const gradient = getCountryGradient(country);

                    return (
                        <label
                            key={country}
                            className={`
                flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden
                ${isSelected
                                    ? 'bg-gradient-to-r ' + gradient + ' bg-opacity-20 border-2 border-violet-400 shadow-lg shadow-violet-500/30 scale-105'
                                    : 'bg-white/5 border-2 border-white/10 hover:border-violet-400/50 hover:bg-white/10'
                                }
              `}
                            style={{
                                animation: `fade-in-up 0.${index + 3}s ease-out`
                            }}
                        >
                            {/* Animated background on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-fuchsia-600/20 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Custom checkbox */}
                            <div className="relative z-10">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleCountry(country)}
                                    className="w-6 h-6 rounded-lg border-2 border-violet-400 bg-white/10 checked:bg-gradient-to-br checked:from-violet-600 checked:to-fuchsia-600 focus:ring-2 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer transition-all appearance-none checked:border-transparent"
                                    style={{
                                        backgroundImage: isSelected ? 'url("data:image/svg+xml,%3csvg viewBox=\'0 0 16 16\' fill=\'white\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z\'/%3e%3c/svg%3e")' : 'none'
                                    }}
                                />
                            </div>

                            {/* Flag emoji */}
                            <span className="text-3xl drop-shadow-lg relative z-10 transform group-hover:scale-125 transition-transform duration-300">
                                {flag}
                            </span>

                            {/* Country name */}
                            <span className={`
                font-semibold relative z-10 transition-colors duration-300
                ${isSelected ? 'text-white' : 'text-violet-100/90 group-hover:text-white'}
              `}>
                                {country}
                            </span>

                            {/* Selection indicator */}
                            {isSelected && (
                                <span className="ml-auto text-xl relative z-10 animate-pulse">✨</span>
                            )}
                        </label>
                    );
                })}
            </div>

            {/* Selected Count with gradient background */}
            <div className="mt-8 pt-6 border-t border-violet-500/30 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-4 border border-violet-400/30">
                    <p className="text-center font-bold">
                        <span className="text-3xl text-gradient-alt glow">{selectedCountries.length}</span>
                        <span className="text-violet-300 mx-2">/</span>
                        <span className="text-xl text-white/80">{allCountries.length}</span>
                    </p>
                    <p className="text-center text-sm text-violet-300/80 mt-1">
                        countries selected
                    </p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        </aside>
    );
}
