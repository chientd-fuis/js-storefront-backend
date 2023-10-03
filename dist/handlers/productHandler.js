"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
const validation_1 = require("../utils/functions/validation");
const store = new product_1.ProductModel();
const create = async (_req, res) => {
    try {
        const product = {
            name: (0, validation_1.checkValidateText)(_req.body.name),
            price: (0, validation_1.checkValidateNumber)(_req.body.price)
        };
        const result = await store.create(product);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const getAll = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const getProductById = async (_req, res) => {
    try {
        const productId = _req.params.productId;
        const product = await store.show(parseInt(productId));
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const deleteProduct = async (_req, res) => {
    try {
        const productId = _req.params.productId;
        const product = await store.deleteOne(parseInt(productId));
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const updateProduct = async (_req, res) => {
    try {
        const product = {
            id: parseInt(_req.params.productId),
            name: (0, validation_1.checkValidateText)(_req.query.name),
            price: (0, validation_1.checkValidateNumber)(_req.query.price),
        };
        const result = await store.update(product);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const productHandler = (app) => {
    app.post('/products/add', create);
    app.get('/products', getAll);
    app.get('/products/:productId', getProductById);
    app.delete('/products/:productId', deleteProduct);
    app.put('/products/:productId', updateProduct);
};
exports.default = productHandler;
