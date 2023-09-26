"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class Book {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM books";
            const query = await conn.query(sql);
            conn.release();
            return query.rows;
        }
        catch (error) {
            throw new Error(`Failed to get Book from database ${error}`);
        }
    }
}
exports.Book = Book;
