"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../model/order");
const validation_1 = require("../utils/functions/validation");
const OrderType_1 = require("../utils/interfaces/OrderType");
const store = new order_1.OrderModel();
const getOrders = async (_req, res) => {
    try {
        const orderId = parseInt(_req.params.orderId);
        const order = await store.getOne(orderId);
        res.json(order);
    }
    catch (err) {
        res.status(404);
        res.json({ code: 404, message: `${err}` });
    }
};
const getOrdersByUserID = async (_req, res) => {
    try {
        const userId = (0, validation_1.checkValidateNumber)(_req.query.user_id);
        const order = await store.getOrderByUserId(userId);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const create = async (_req, res) => {
    try {
        const products = _req.body.products || [];
        const newOrder = {
            user_id: (0, validation_1.checkValidateNumber)(_req.body.user_id),
            status: OrderType_1.OrderStatus.ACTIVE,
            products: products
        };
        const result = await store.createOrder(newOrder);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const changeStatusOrder = async (_req, res) => {
    try {
        const orderId = _req.params.orderId;
        const status = (0, validation_1.checkValidateText)(_req.query.status);
        const order = await store.changeStatusOrder(parseInt(orderId), status);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const updateProductInOrder = async (_req, res) => {
    const orderId = _req.params.orderId;
    const productId = _req.params.productId;
    const quality = _req.query.quality;
    try {
        const updateOrder = {
            order_id: parseInt(orderId),
            product_id: parseInt(productId),
            quantity: (0, validation_1.checkValidateNumber)(quality)
        };
        const order = await store.updateProductInOrder(updateOrder);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const deleteProductInOrder = async (_req, res) => {
    const orderId = _req.params.orderId;
    const productId = _req.params.productId;
    try {
        const order = await store.deleteProductInOrder(parseInt(orderId), parseInt(productId));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ code: 400, message: `${err}` });
    }
};
const orderHandler = (app) => {
    app.get('/orders/:orderId', getOrders);
    app.get('/orders', getOrdersByUserID);
    app.post('/orders/add', create);
    app.put('/orders/:orderId/:productId', updateProductInOrder);
    app.delete('/orders/:orderId/:productId', deleteProductInOrder);
    app.put('/orders/:orderId', changeStatusOrder);
};
exports.default = orderHandler;
