"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error get all products with error: ${error}`);
        }
    }
    async show(productId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(sql, [productId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error get product by ID ${productId} with error: ${error}`);
        }
    }
    async create(product) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;';
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error creating product with error: ${error}`);
        }
    }
    async deleteOne(productId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *;';
            const result = await conn.query(sql, [productId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error creating product with error: ${error}`);
        }
    }
    async update(product) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *;';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.id
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error updating product with error: ${error}`);
        }
    }
}
exports.ProductModel = ProductModel;
