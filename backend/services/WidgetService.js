const Widget = require('../models/Widget');
const GeocodingService = require('./GeocodingService');

class WidgetService {

    static async createWidget(location) {
       
        const geoResult = await GeocodingService.getGeo(location);
        if (!geoResult) {
            throw new Error('Location not found');
        }

        const newWidget = new Widget({ location });
        await newWidget.save();
        return newWidget;
    }

}

module.exports = WidgetService;
