const Widget = require('../models/Widget');
const GeocodingService = require('../services/GeocodingService');
const WidgetService = require('../services/WidgetService');
const logger = require('../utils/logger');

class WidgetController {

    static async createWidget(req, res) {
        const { location } = req.body;
        logger.info('Request to create widget: %s', location);

        try {
            const widget = await WidgetService.createWidget(location);
            logger.info('Widget created successfully: %s', widget._id);

            res.status(201).json({
                message: 'Widget created successfully!',
                widget,
            });
        } catch (err) {
            logger.error('Error creating widget: %s', err.message);
            res.status(400).json({ error: err.message });
        }
    }

    static async getWidgetById(req, res) {
        const { id } = req.params;
        logger.info('Fetching widget by ID: %s', id);

        try {
            const widget = await Widget.findById(id);
            if (!widget) {
                logger.warn('Widget not found: %s', id);
                return res.status(404).json({ error: 'Widget not found' });
            }

            const { weather, fromCache } = await GeocodingService.getWeather(widget.location);
            logger.info(
                fromCache
                    ? 'Weather served from cache for widget %s'
                    : 'Weather fetched from API for widget %s',
                id
            );

            res.status(200).json({
                message: 'Widget found successfully',
                widget,
                weather,
            });
        } catch (err) {
            logger.error('Error fetching widget by ID %s: %s', id, err.message);
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllWidgets(req, res) {
        logger.info('Fetching all widgets');
        try {
            const widgets = await Widget.find();

            const widgetsWithCoords  = await Promise.all(
                widgets.map(async (widget) => {
                    const geo = await GeocodingService.getGeo(widget.location);
                    return {
                        ...widget.toObject(),
                        latitude: geo?.latitude ?? null,
                        longitude: geo?.longitude ?? null,
                    };
                })
            );

            logger.info('Fetched %d widgets', widgets.length);
            res.status(200).json({
                message: widgets.length > 0 ? 'Widgets found successfully' : 'No widgets available',
                widgetsWithCoords,
            });
        } catch (err) {
            logger.error('Error fetching all widgets: %s', err.message);
            res.status(500).json({ error: err.message });
        }
    }


    static async deleteWidgetById(req, res) {
        const { id } = req.params;
        logger.info('Deleting widget by ID: %s', id);

        try {
            const widget = await Widget.findByIdAndDelete(id);
            if (!widget) {
                logger.warn('Widget not found for deletion: %s', id);
                return res.status(404).json({ error: 'Widget not found' });
            }

            res.status(200).json({
                message: 'Widget deleted successfully',
                widget,
            });
        } catch (err) {
            logger.error('Error deleting widget %s: %s', id, err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = WidgetController;
