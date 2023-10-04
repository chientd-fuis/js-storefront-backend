// @ts-ignore
import client from '../database';
import {
  OrderDetailType,
  OrderDetailTypeRequest,
  OrderTypeRequest,
  OrderTypeResponse
} from '../utils/interfaces/OrderType';

export class OrderModel {
  async getOne(orderId: number): Promise<OrderTypeResponse> {
    let sql = '';
    try {
      // @ts-ignore
      const conn = await client.connect();
      sql = 'SELECT * FROM orders WHERE order_id = $1';
      const orders = await conn.query(sql, [orderId]);

      sql =
        'SELECT order_details.product_id, products.name, price, quantity \n' +
        'FROM order_details \n' +
        'JOIN products ON order_details.product_id = products.id \n' +
        'WHERE order_id = $1';
      const { rows: orderDetails } = await conn.query(sql, [orderId]);
      const newRes: OrderTypeResponse = {
        order_id: orderId,
        status: orders.rows[0].status,
        user_id: orders.rows[0].user_id,
        products: orderDetails
      };
      conn.release();
      return newRes;
    } catch (error) {
      throw new Error(
        `[Orders] Error get order by ID ${orderId} with error: ${error}`
      );
    }
  }

  async getOrderByUserId(userId: number): Promise<OrderTypeResponse[]> {
    let sql = '';
    let newRes: OrderTypeResponse[] = [];
    try {
      // @ts-ignore
      const conn = await client.connect();
      sql = 'SELECT * FROM orders WHERE user_id = $1';
      const { rows: orders } = await conn.query(sql, [userId]);
      for (const order of orders) {
        sql =
          'SELECT products.id, products.name, products.price, quantity \n' +
          'FROM order_details \n' +
          'JOIN products ON order_details.product_id = products.id \n' +
          'WHERE order_id = $1';
        const { rows: od_details } = await conn.query(sql, [order.order_id]);
        newRes.push({
          order_id: order.order_id,
          status: order.status,
          user_id: order.user_id,
          products: od_details
        });
      }
      conn.release();
      return newRes;
    } catch (error) {
      throw new Error(
        `[Orders] Error get order by user ID ${userId} with error: ${error}`
      );
    }
  }

  async createOrder(orders: OrderTypeRequest): Promise<OrderTypeResponse> {
    // @ts-ignore
    const conn = await client.connect();
    try {
      await conn.query('BEGIN');
      const queryText =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING order_id';
      const result = await conn.query(queryText, [
        orders.user_id,
        orders.status
      ]);
      const orderId = await result.rows[0].order_id;
      const products: OrderDetailTypeRequest[] = [];
      for (const p of orders.products) {
        const insertOrderDetailSql =
          'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity';
        const odResult = await conn.query(insertOrderDetailSql, [
          orderId,
          p.product_id,
          p.quantity
        ]);
        products.push(odResult.rows[0]);
      }
      const newOrder: OrderTypeResponse = {
        order_id: orderId,
        user_id: orders.user_id,
        status: orders.status,
        products: products
      };
      await conn.query('COMMIT');
      return newOrder;
    } catch (e) {
      await conn.query('ROLLBACK');
      throw new Error(`[Orders] Error creating order with error: ${e}`);
    } finally {
      conn.release();
    }
  }

  async changeStatusOrder(
    orderId: number,
    status: string
  ): Promise<OrderTypeResponse> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *';
      const result = await conn.query(sql, [status, orderId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`[Orders] Error update status with error: ${error}`);
    }
  }

  async deleteProductInOrder(
    orderId: number,
    productId: number
  ): Promise<OrderDetailType> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'DELETE FROM order_details WHERE order_id = $1 AND product_id = $2 RETURNING *';
      const result = await conn.query(sql, [orderId, productId]);
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
      const sqlCheck =
        'SELECT * FROM order_details WHERE order_id = $1 AND product_id = $2';
      const isExist = await conn.query(sqlCheck, [od.order_id, od.product_id]);
      if (!isExist.rows[0]) {
        const sqlInsert =
          'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
        result = await conn.query(sqlInsert, [
          od.order_id,
          od.product_id,
          od.quantity
        ]);
      } else {
        const sql =
          'UPDATE order_details SET quantity = $1 WHERE order_id = $2 AND product_id = $3 RETURNING *';
        result = await conn.query(sql, [
          od.quantity,
          od.order_id,
          od.product_id
        ]);
      }

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`[Order Details] updateQualityOrder has ${error}`);
    }
  }
}
