const axios = require('axios');
const WeatherCache = require('../cache/weatherCache');

const dotenv = require('dotenv');

dotenv.config();

class GeocodingService {

    static async getGeo(location) {
        try {
            const geoResponse = await axios.get(process.env.GEOCODE_API_URL, {
                params: { name: location, count: 1, language: 'en', format: 'json' }
            });

            return geoResponse.data.results?.[0] || null;
        } catch (error) {
            console.error('Error fetching geocode:', error);
            return null;
        }
    }

    static async getWeather(location) {
        // Check if weather cached
        const cached = WeatherCache.get(location);
        if (cached) return { weather: cached, fromCache: true };

        const geoResult = await this.getGeo(location);
        if (!geoResult) return null;

        const { latitude, longitude } = geoResult;

        try {
            const weatherResponse = await axios.get(process.env.WEATHER_API_URL, {
                params: {
                    latitude,
                    longitude,
                    current_weather: true,
                    timezone: 'Europe/Berlin',
                },
            });

            const weather = weatherResponse.data.current_weather;

            // Save to cache
            if (weather) WeatherCache.set(location, weather);

            return { weather, fromCache: false };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }
}

module.exports = GeocodingService;
