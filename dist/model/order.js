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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.getOne = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, orders, orderDetails, newRes, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders WHERE order_id = $1';
                        return [4 /*yield*/, conn.query(sql, [orderId])];
                    case 3:
                        orders = _a.sent();
                        sql =
                            'SELECT order_details.product_id, products.name, price, quantity \n' +
                                'FROM order_details \n' +
                                'JOIN products ON order_details.product_id = products.id \n' +
                                'WHERE order_id = $1';
                        return [4 /*yield*/, conn.query(sql, [orderId])];
                    case 4:
                        orderDetails = (_a.sent()).rows;
                        newRes = {
                            order_id: orderId,
                            status: orders.rows[0].status,
                            user_id: orders.rows[0].user_id,
                            products: orderDetails
                        };
                        conn.release();
                        return [2 /*return*/, newRes];
                    case 5:
                        error_1 = _a.sent();
                        throw new Error("[Orders] Error get order by ID ".concat(orderId, " with error: ").concat(error_1));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.getOrderByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, newRes, conn, orders, _i, orders_1, order, od_details, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = '';
                        newRes = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders WHERE user_id = $1';
                        return [4 /*yield*/, conn.query(sql, [userId])];
                    case 3:
                        orders = (_a.sent()).rows;
                        _i = 0, orders_1 = orders;
                        _a.label = 4;
                    case 4:
                        if (!(_i < orders_1.length)) return [3 /*break*/, 7];
                        order = orders_1[_i];
                        sql =
                            'SELECT products.id, products.name, products.price, quantity \n' +
                                'FROM order_details \n' +
                                'JOIN products ON order_details.product_id = products.id \n' +
                                'WHERE order_id = $1';
                        return [4 /*yield*/, conn.query(sql, [order.order_id])];
                    case 5:
                        od_details = (_a.sent()).rows;
                        newRes.push({
                            order_id: order.order_id,
                            status: order.status,
                            user_id: order.user_id,
                            products: od_details
                        });
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, newRes];
                    case 8:
                        error_2 = _a.sent();
                        throw new Error("[Orders] Error get order by user ID ".concat(userId, " with error: ").concat(error_2));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.createOrder = function (orders) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, queryText, result, orderId, products, _i, _a, p, insertOrderDetailSql, odResult, newOrder, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 11, 13, 14]);
                        return [4 /*yield*/, conn.query('BEGIN')];
                    case 3:
                        _b.sent();
                        queryText = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING order_id';
                        return [4 /*yield*/, conn.query(queryText, [
                                orders.user_id,
                                orders.status
                            ])];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, result.rows[0].order_id];
                    case 5:
                        orderId = _b.sent();
                        products = [];
                        _i = 0, _a = orders.products;
                        _b.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        p = _a[_i];
                        insertOrderDetailSql = 'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity';
                        return [4 /*yield*/, conn.query(insertOrderDetailSql, [
                                orderId,
                                p.product_id,
                                p.quantity
                            ])];
                    case 7:
                        odResult = _b.sent();
                        products.push(odResult.rows[0]);
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        newOrder = {
                            order_id: orderId,
                            user_id: orders.user_id,
                            status: orders.status,
                            products: products
                        };
                        return [4 /*yield*/, conn.query('COMMIT')];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, newOrder];
                    case 11:
                        e_1 = _b.sent();
                        return [4 /*yield*/, conn.query('ROLLBACK')];
                    case 12:
                        _b.sent();
                        throw new Error("[Orders] Error creating order with error: ".concat(e_1));
                    case 13:
                        conn.release();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.changeStatusOrder = function (orderId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [status, orderId])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("[Orders] Error update status with error: ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.deleteProductInOrder = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM order_details WHERE order_id = $1 AND product_id = $2 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [orderId, productId])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("[Order Details] deleteProductInOrder has ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.updateProductInOrder = function (od) {
        return __awaiter(this, void 0, void 0, function () {
            var result, conn, sqlCheck, isExist, sqlInsert, sql, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sqlCheck = 'SELECT * FROM order_details WHERE order_id = $1 AND product_id = $2';
                        return [4 /*yield*/, conn.query(sqlCheck, [od.order_id, od.product_id])];
                    case 3:
                        isExist = _a.sent();
                        if (!!isExist.rows[0]) return [3 /*break*/, 5];
                        sqlInsert = 'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, conn.query(sqlInsert, [
                                od.order_id,
                                od.product_id,
                                od.quantity
                            ])];
                    case 4:
                        result = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        sql = 'UPDATE order_details SET quantity = $1 WHERE order_id = $2 AND product_id = $3 RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [
                                od.quantity,
                                od.order_id,
                                od.product_id
                            ])];
                    case 6:
                        result = _a.sent();
                        _a.label = 7;
                    case 7:
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 8:
                        error_5 = _a.sent();
                        throw new Error("[Order Details] updateQualityOrder has ".concat(error_5));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.OrderModel = OrderModel;
