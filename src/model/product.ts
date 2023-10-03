// @ts-ignore
import client from "../database";
import { ProductTypeRequest, ProductTypeResponse } from "../utils/interfaces/ProductType";

export class ProductModel {
    async index(): Promise<ProductTypeResponse[]> {
       try {
           // @ts-ignore
           const conn = await client.connect();
           const sql = "SELECT * FROM products";
           const result = await conn.query(sql)
           conn.release();
           return result.rows;
       } catch (error) {
           throw new Error(`Error get all products with error: ${error}`);
       }
    }

    async show(productId: number): Promise<ProductTypeResponse> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "SELECT * FROM products WHERE product_id = $1";
            const result = await conn.query(sql, [productId])
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error get product by ID ${productId} with error: ${error}`);
        }
     }


    async create(product: ProductTypeRequest): Promise<ProductTypeResponse> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "INSERT INTO products (product_name, product_price) VALUES ($1, $2) RETURNING *;";
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating product with error: ${error}`);
        }
    }

    async deleteOne(productId: number): Promise<ProductTypeResponse> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "DELETE FROM products WHERE product_id = $1 RETURNING *;";
            const result = await conn.query(sql, [productId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating product with error: ${error}`);
        }
    }

    async update(product: ProductTypeResponse): Promise<ProductTypeResponse> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "UPDATE products SET product_name = $1, product_price = $2 WHERE product_id = $3 RETURNING *;";
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.id
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating product with error: ${error}`);
        }
    }
}