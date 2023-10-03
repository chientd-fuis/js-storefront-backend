"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_secret = process.env.TOKEN_SECRET;
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.user_id, password: user.password }, token_secret);
}
exports.generateToken = generateToken;
function verifyToken(_req, res, next) {
    try {
        const authorization = _req.headers.authorization;
        const token = authorization ? authorization.split(' ')[1] : '';
        jsonwebtoken_1.default.verify(token, token_secret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json(`Invalid authorization with ${error}!!!`);
    }
}
exports.verifyToken = verifyToken;
