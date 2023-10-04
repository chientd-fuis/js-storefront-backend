"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../model/order");
var token_1 = require("../utils/functions/token");
var validation_1 = require("../utils/functions/validation");
var OrderType_1 = require("../utils/interfaces/OrderType");
var store = new order_1.OrderModel();
var getOrders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(_req.params.orderId);
                return [4 /*yield*/, store.getOne(orderId)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404);
                res.json({ code: 404, message: "".concat(err_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrdersByUserID = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, order, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = (0, validation_1.checkValidateNumber)(_req.query.user_id);
                return [4 /*yield*/, store.getOrderByUserId(userId)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json({ code: 400, message: "".concat(err_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, newOrder, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                products = _req.body.products || [];
                newOrder = {
                    user_id: (0, validation_1.checkValidateNumber)(_req.body.user_id),
                    status: OrderType_1.OrderStatus.ACTIVE,
                    products: products
                };
                return [4 /*yield*/, store.createOrder(newOrder)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400);
                res.json({ code: 400, message: "".concat(err_3) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var changeStatusOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, status_1, order, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = _req.params.orderId;
                status_1 = (0, validation_1.checkValidateText)(_req.query.status);
                return [4 /*yield*/, store.changeStatusOrder(parseInt(orderId), status_1)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400);
                res.json({ code: 400, message: "".concat(err_4) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateProductInOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, quality, updateOrder, order, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = _req.params.orderId;
                productId = _req.params.productId;
                quality = _req.query.quality;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                updateOrder = {
                    order_id: parseInt(orderId),
                    product_id: parseInt(productId),
                    quantity: (0, validation_1.checkValidateNumber)(quality)
                };
                return [4 /*yield*/, store.updateProductInOrder(updateOrder)];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400);
                res.json({ code: 400, message: "".concat(err_5) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteProductInOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, order, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = _req.params.orderId;
                productId = _req.params.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.deleteProductInOrder(parseInt(orderId), parseInt(productId))];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400);
                res.json({ code: 400, message: "".concat(err_6) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var orderHandler = function (app) {
    app.get('/orders/:orderId', getOrders);
    app.get('/orders', getOrdersByUserID);
    app.post('/orders/add', token_1.verifyToken, create);
    app.put('/orders/:orderId/:productId', token_1.verifyToken, updateProductInOrder);
    app.delete('/orders/:orderId/:productId', token_1.verifyToken, deleteProductInOrder);
    app.put('/orders/:orderId', token_1.verifyToken, changeStatusOrder);
};
exports.default = orderHandler;
