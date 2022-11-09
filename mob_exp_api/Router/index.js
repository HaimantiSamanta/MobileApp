const express = require('express');

const route = express.Router();

const featureController = require('../Controllers/Features');
const brandtypesController = require('../Controllers/BrandTypes');
const serieController = require('../Controllers/Series');
const userController = require('../Controllers/Users');
const menuItemsController = require('../Controllers/MenuItems');
const ordersController = require('../Controllers/Orders');
const paymentGatewayController = require('../Controllers/Payments');

route.get('/features', featureController.getFeatures);
route.get('/brandtypes', brandtypesController.getBrandTypes);

route.get('/series/:locId', serieController.getSeriesByFeature);
route.post('/login', userController.userLogin);
route.post('/signup', userController.userSignUp);
route.post('/filter', serieController.serieFilter);
route.get('/serie/:resId', serieController.getSerieDetailsById);

route.get('/menuitems/:resId', menuItemsController.getMenuItemsByResId);
route.post('/order', ordersController.saveOrderDetails);
route.get('/orders/:userId', ordersController.getOrdersByUserId);
route.post('/payment', paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);

module.exports = route;