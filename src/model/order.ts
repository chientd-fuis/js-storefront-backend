// @ts-ignore
import client from "../database";
import { OrderDetailType, OrderTypeRequest, OrderTypeResponse } from "../utils/interfaces/OrderType";

export class OrderModel {
    async getOne(orderId: number): Promise<OrderTypeResponse> {
        let sql = "";
        try {
            // @ts-ignore
            const conn = await client.connect();
            sql = "SELECT * FROM orders WHERE order_id = $1";
            const orders = await conn.query(sql, [orderId]);

            sql = "SELECT products.product_id, product_name, products.product_price, quantity \n"+
                    "FROM order_details \n"+
                    "JOIN products ON order_details.product_id = products.product_id \n"+
                    "WHERE order_id = $1";
            const {rows: orderDetails} = await conn.query(sql, [orderId]);
            console.log(orderDetails)
            const newRes: OrderTypeResponse = {
                orderId: orderId,
                status: orders.rows[0].order_status,
                userId: orders.rows[0].user_id,
                products: orderDetails
            }
            conn.release();
            return newRes;
        } catch (error) {
            throw new Error(`[Orders] Error get order by ID ${orderId} with error: ${error}`);
        }
     }

     async getOrderByUserId(userId: number): Promise<OrderTypeResponse[]> {
        let sql = "";
        let newRes: OrderTypeResponse[] = [];
        try {
            // @ts-ignore
            const conn = await client.connect();
            sql = "SELECT * FROM orders WHERE user_id = $1";
            const {rows : orders} = await conn.query(sql, [userId]);
            console.log(orders);
            for(const order of orders) {
                sql = "SELECT products.product_id, product_name, products.product_price, quantity \n"+
                        "FROM order_details \n"+
                        "JOIN products ON order_details.product_id = products.product_id \n"+
                        "WHERE order_id = $1";
                const {rows: od_details} = await conn.query(sql, [order.order_id]);
                console.log(od_details)
                newRes.push({
                    orderId: order.order_id,
                    status: order.order_status,
                    userId: order.user_id,
                    products: od_details
                })
            }
            conn.release();
            return newRes;
        } catch (error) {
            throw new Error(`[Orders] Error get order by user ID ${userId} with error: ${error}`);
        }
     }

    async createOrder(orders: OrderTypeRequest): Promise<OrderTypeResponse> {
        // @ts-ignore
        const conn = await client.connect();
        try {
            await conn.query('BEGIN');
            const queryText = 'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING order_id';
            const result = await conn.query(queryText, [orders.userId, orders.status])
            const orderId = await result.rows[0].order_id;
            for (const p of orders.products) {
                const insertOrderDetailSql = 'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
                await conn.query(insertOrderDetailSql, [
                    orderId,
                    p.productId,
                    p.quantity
                ])
            };
            const newOrder: OrderTypeResponse = {
                orderId: orderId,
                ...orders
            }
            await conn.query('COMMIT');
            return newOrder;
        } catch (e) {
            await conn.query('ROLLBACK');
            throw new Error(`[Orders] Error creating order with error: ${e}`);
        } finally {
            conn.release()
        }
          
    }

    async changeStatusOrder(orderId: number, status: string): Promise<OrderTypeResponse> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "UPDATE orders SET status = $1 WHERE order_id = $2";
            const result = await conn.query(sql, [status, orderId])
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`[Orders] Error update status with error: ${error}`);
        }
    }

    async deleteProductInOrder(orderId: number, productId: number): Promise<OrderDetailType> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "DELETE FROM order_details WHERE order_id = $1 AND product_id = $2";
            const result = await conn.query(sql, [orderId, productId])
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`[Order Details] deleteProductInOrder has ${error}`);
        }
    }

    async updateProductInOrder(od: OrderDetailType): Promise<OrderDetailType> {
        let result = null;
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sqlCheck = "SELECT * FROM order_details WHERE order_id = $1 AND product_id = $2";
            const isExist = await conn.query(sqlCheck, [od.orderId, od.productId]);
            if (!isExist) {
                const sqlInsert = "INSERT INTO order_details (order_id, product_id, quality) VALUES ($1, $2, $3)";
                result = await conn.query(sqlInsert, 
                    [od.orderId,
                    od.productId,
                    od.quantity])
            } else {
                const sql = "UPDATE order_details SET quality = $1 WHERE order_id = $2 AND product_id = $3";
                result = await conn.query(sql, [od.quantity, od.productId, od.orderId])
            }

            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`[Order Details] updateQualityOrder has ${error}`);
        }
    }
    
}