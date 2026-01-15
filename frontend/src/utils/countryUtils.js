// Country to flag emoji mapping
export const countryFlags = {
    'Argentina': '🇦🇷',
    'Austria': '🇦🇹',
    'Brazil': '🇧🇷',
    'Canada': '🇨🇦',
    'Chile': '🇨🇱',
    'Colombia': '🇨🇴',
    'Costa Rica': '🇨🇷',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Ireland': '🇮🇪',
    'Italy': '🇮🇹',
    'Japan': '🇯🇵',
    'Mexico': '🇲🇽',
    'Netherlands': '🇳🇱',
    'Spain': '🇪🇸',
    'Switzerland': '🇨🇭',
    'United Kingdom': '🇬🇧',
    'United States': '🇺🇸',
};

// Get flag for a country, with fallback
export const getCountryFlag = (country) => {
    return countryFlags[country] || '🌍';
};

// Country color themes for visual distinction
export const countryColors = {
    'Argentina': 'from-sky-500 to-blue-600',
    'Austria': 'from-red-500 to-white',
    'Brazil': 'from-green-500 to-yellow-500',
    'Canada': 'from-red-600 to-white',
    'Chile': 'from-blue-600 to-red-600',
    'Colombia': 'from-yellow-400 to-blue-600',
    'Costa Rica': 'from-blue-500 to-red-500',
    'France': 'from-blue-600 to-red-600',
    'Germany': 'from-gray-800 to-red-600',
    'Ireland': 'from-green-600 to-orange-500',
    'Italy': 'from-green-600 to-red-600',
    'Japan': 'from-white to-red-600',
    'Mexico': 'from-green-600 to-red-600',
    'Netherlands': 'from-red-600 to-blue-600',
    'Spain': 'from-red-600 to-yellow-500',
    'Switzerland': 'from-red-600 to-white',
    'United Kingdom': 'from-blue-800 to-red-600',
    'United States': 'from-blue-700 to-red-600',
};

export const getCountryGradient = (country) => {
    return countryColors[country] || 'from-violet-500 to-purple-600';
};
