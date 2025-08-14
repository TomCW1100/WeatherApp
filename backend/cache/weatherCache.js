class WeatherCache {
  static cache = {};
  static TTL = 5 * 60 * 1000; // 5 minutes

  static get(location) {
    const entry = this.cache[location];
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.TTL) {
      delete this.cache[location];
      return null;
    }

    return entry.data;
  }

  static set(location, data) {
    this.cache[location] = { data, timestamp: Date.now() };
  }
}

module.exports = WeatherCache;
