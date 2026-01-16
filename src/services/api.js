import axios from 'axios';

const API_BASE_URL = '/data';

export const metricsService = {
    /**
     * Fetch all metrics data from static JSON file
     * @returns {Promise<Array>} Array of city metrics
     */
    async getMetrics() {
        try {
            const response = await axios.get(`${API_BASE_URL}/metrics.json`);
            return response.data;
        } catch (error) {
            console.error('Error fetching metrics:', error);
            throw error;
        }
    },

    /**
     * Filter metrics by countries
     * @param {Array} data - Full metrics data
     * @param {Array} countries - Array of country names to filter
     * @returns {Array} Filtered metrics
     */
    filterByCountries(data, countries) {
        if (!countries || countries.length === 0) {
            return data;
        }
        return data.filter(item => countries.includes(item.country));
    },

    /**
     * Calculate average purchasing power index
     * @param {Array} data - Metrics data
     * @returns {number} Average PPI
     */
    calculateAvgPPI(data) {
        if (!data || data.length === 0) return 0;
        const sum = data.reduce((acc, item) => acc + (item.purchasing_power_index || 0), 0);
        return sum / data.length;
    },

    /**
     * Calculate average hours to earn basket
     * @param {Array} data - Metrics data
     * @returns {number} Average hours
     */
    calculateAvgHours(data) {
        if (!data || data.length === 0) return 0;
        const sum = data.reduce((acc, item) => acc + (item.hours_to_earn_basket || 0), 0);
        return sum / data.length;
    },

    /**
     * Get city with highest purchasing power
     * @param {Array} data - Metrics data
     * @returns {Object} City with highest PPI
     */
    getHighestPPI(data) {
        if (!data || data.length === 0) return null;
        return data.reduce((max, item) =>
            (item.purchasing_power_index > (max?.purchasing_power_index || 0)) ? item : max
            , null);
    },

    /**
     * Get all unique countries from data
     * @param {Array} data - Metrics data
     * @returns {Array} Sorted array of unique countries
     */
    getUniqueCountries(data) {
        if (!data || data.length === 0) return [];
        const countries = [...new Set(data.map(item => item.country))];
        return countries.sort();
    }
};
