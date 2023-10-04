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
var user_1 = require("../model/user");
var token_1 = require("../utils/functions/token");
var validation_1 = require("../utils/functions/validation");
var store = new user_1.UserModel();
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userAuth, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    first_name: (0, validation_1.checkValidateText)(_req.body.first_name),
                    last_name: (0, validation_1.checkValidateText)(_req.body.last_name),
                    password: (0, validation_1.checkValidateText)(_req.body.password)
                };
                return [4 /*yield*/, store.create(user)];
            case 1:
                userAuth = _a.sent();
                res.json(userAuth);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(401);
                res.json({ code: 401, message: "".concat(err_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, auth, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    user_id: (0, validation_1.checkValidateNumber)(_req.body.user_id),
                    password: (0, validation_1.checkValidateText)(_req.body.password)
                };
                return [4 /*yield*/, store.authenticate(user)];
            case 1:
                auth = _a.sent();
                res.json(auth);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(401);
                res.json({ code: 401, message: "".concat(err_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateUserInfo = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUserUpdate, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    user_id: parseInt(_req.params.user_id),
                    first_name: (0, validation_1.checkValidateText)(_req.body.first_name),
                    last_name: (0, validation_1.checkValidateText)(_req.body.last_name),
                    password: (0, validation_1.checkValidateText)(_req.body.password)
                };
                return [4 /*yield*/, store.update(user)];
            case 1:
                newUserUpdate = _a.sent();
                res.json(newUserUpdate);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(403);
                res.json({ code: 403, message: "".concat(err_3) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userDelete, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = _req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.delete(parseInt(userId))];
            case 2:
                userDelete = _a.sent();
                res.json(userDelete);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(403);
                res.json({ code: 403, message: "".concat(err_4) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getUserInfo = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userInfo, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = _req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.show(parseInt(userId))];
            case 2:
                userInfo = _a.sent();
                res.json(userInfo);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(403);
                res.json({ code: 403, message: "".concat(err_5) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var userHandler = function (app) {
    app.post('/users/sign-up', create);
    app.post('/users/sign-in', authenticate);
    app.put('/users/:user_id', token_1.verifyToken, updateUserInfo);
    app.delete('/users/:user_id', token_1.verifyToken, deleteUser);
    app.get('/users/:user_id', token_1.verifyToken, getUserInfo);
};
exports.default = userHandler;
