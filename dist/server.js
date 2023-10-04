"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userHandler_1 = __importDefault(require("./handlers/userHandler"));
const productHandler_1 = __importDefault(require("./handlers/productHandler"));
const orderHandler_1 = __importDefault(require("./handlers/orderHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
let port = 3000;
if (process.env.ENV === 'test') {
    port = 3333;
}
const address = `http://localhost:${port}`;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
(0, userHandler_1.default)(app);
(0, productHandler_1.default)(app);
(0, orderHandler_1.default)(app);
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
