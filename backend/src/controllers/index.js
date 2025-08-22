// src/controllers/index.js

const UserController = require('./userController');
const ProductController = require('./productController');
const OrderController = require('./orderController');

module.exports = {
    UserController,
    ProductController,
    OrderController
};