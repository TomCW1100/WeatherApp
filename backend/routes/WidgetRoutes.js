const express = require('express');
const WidgetController = require('../controllers/widgetController');

const router = express.Router();

router.post('/create-widget', WidgetController.createWidget);

router.get('/:id', WidgetController.getWidgetById);

router.get('/', WidgetController.getAllWidgets);

router.delete('/:id', WidgetController.deleteWidgetById);

module.exports = router;
