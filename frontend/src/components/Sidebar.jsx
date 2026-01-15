import { useState } from 'react';

export default function Sidebar({ allCountries, selectedCountries, onCountriesChange }) {
    const [searchTerm, setSearchTerm] = useState('');

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
        <aside className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gradient mb-2">🌍 Filters</h2>
                <p className="text-sm text-white/60">Select countries to display</p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Select All / Deselect All */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={selectAll}
                    className="flex-1 px-3 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 rounded-lg text-sm font-medium transition-all"
                >
                    Select All
                </button>
                <button
                    onClick={deselectAll}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-all"
                >
                    Clear
                </button>
            </div>

            {/* Country List */}
            <div className="space-y-2">
                {filteredCountries.map((country) => (
                    <label
                        key={country}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCountries.includes(country)}
                            onChange={() => toggleCountry(country)}
                            className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-primary-500 checked:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer transition-all"
                        />
                        <span className="text-white/80 group-hover:text-white transition-colors">
                            {country}
                        </span>
                    </label>
                ))}
            </div>

            {/* Selected Count */}
            <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-white/60 text-center">
                    <span className="text-primary-400 font-semibold">{selectedCountries.length}</span> of{' '}
                    <span className="text-white/80">{allCountries.length}</span> countries selected
                </p>
            </div>
        </aside>
    );
}
