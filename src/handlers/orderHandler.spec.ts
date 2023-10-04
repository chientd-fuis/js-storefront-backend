import supertest from 'supertest';

import app from '../server';
import { OrderStatus } from '../utils/interfaces/OrderType';
import { ProductTypeRequest } from '../utils/interfaces/ProductType';
import { UserTypeRequest } from '../utils/interfaces/UserType';

const request = supertest(app);

describe('Order Handler', () => {
  const userData: UserTypeRequest = {
    first_name: 'Chien TEST',
    last_name: 'TD TEST',
    password: 'password123'
  };

  let token: string,
    userId: number = 1,
    productId: number,
    orderId: number;

  beforeAll(async () => {
    const response = await request.post('/users/sign-up').send(userData);
    userId = response.body.user_id;
    token = response.body.token;

    const product1: ProductTypeRequest = { name: 'Product Name 1', price: 99 };
    const productRes = await request
      .post('/products/add')
      .set('Authorization', `Bearer ${token}`)
      .send(product1);
    productId = productRes.body.id;

    const product2: ProductTypeRequest = { name: 'Product Name 2', price: 99 };
    await request
      .post('/products/add')
      .set('Authorization', `Bearer ${token}`)
      .send(product2);
  });

  describe('POST /orders/add', () => {
    it('should return 400 when missing params', async (): Promise<void> => {
      const response = await request.post('/orders/add');
      expect(response.status).toBe(400);
    });

    it('should return 200 success', async (): Promise<void> => {
      const order = {
        user_id: userId,
        products: [
          {
            product_id: productId,
            quantity: 100
          }
        ]
      };
      const response = await request.post('/orders/add').send(order);
      orderId = response.body.order_id;
      expect(response.status).toBe(200);
      expect(response.body.order_id).toEqual(1);
      expect(response.body.user_id).toEqual(userId);
      expect(response.body.products.length).toEqual(1);
    });
  });

  describe('GET /orders/:order_id', () => {
    it('should return 200 success', async (): Promise<void> => {
      const response = await request.get(`/orders/${orderId}`);
      expect(response.status).toBe(200);
      expect(response.body.order_id).toEqual(1);
      expect(response.body.user_id).toEqual(userId);
      expect(response.body.products.length).toEqual(1);
    });

    it('should return 404 not found', async (): Promise<void> => {
      const response = await request.get('/orders/2');
      expect(response.status).toBe(404);
      expect(response.body.order_id).toBeUndefined();
    });
  });

  describe('GET /orders', () => {
    it('should return 400 when missing params', async (): Promise<void> => {
      const response = await request.get('/orders');
      expect(response.status).toBe(400);
    });

    it('should return 200 success', async (): Promise<void> => {
      const response = await request.get(`/orders?user_id=${userId}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(1);
      expect(response.body[0].user_id).toEqual(userId);
      expect(response.body[0].products.length).toEqual(1);
    });
  });

  describe('PUT /orders/:order_id - update status', () => {
    it('should return 400 when missing status params', async (): Promise<void> => {
      const response = await request.put(`/orders/${orderId}`);
      expect(response.status).toBe(400);
    });

    it('should return 200 success', async (): Promise<void> => {
      const response = await request.put(
        `/orders/${orderId}?status=${OrderStatus.COMPLETED}`
      );
      expect(response.status).toBe(200);
      expect(response.body.order_id).toEqual(1);
      expect(response.body.status).toEqual(OrderStatus.COMPLETED);
      expect(response.body.user_id).toEqual(userId);
    });
  });

  describe('PUT /orders/:order_id/:product_id - update product', () => {
    it('should return 400 when missing status params', async (): Promise<void> => {
      const response = await request.put(`/orders/${orderId}/${productId}`);
      expect(response.status).toBe(400);
    });

    it('should return 200 success - only change quality', async (): Promise<void> => {
      const response = await request.put(
        `/orders/${orderId}/${productId}?quality=111`
      );
      expect(response.status).toBe(200);
      expect(response.body.product_id).toEqual(1);
      expect(response.body.quantity).toEqual(111);
    });

    it('should return 200 success - add new exist product', async (): Promise<void> => {
      const response = await request.put(
        `/orders/${orderId}/${productId + 1}?quality=101`
      );
      expect(response.status).toBe(200);
      expect(response.body.product_id).toEqual(2);
      expect(response.body.quantity).toEqual(101);
      const res = await request.get(`/orders/${orderId}`);
      expect(res.body.products.length).toEqual(2);
    });

    it('should return 400 - when not found product id', async (): Promise<void> => {
      const response = await request.put(`/orders/${orderId}/99?quality=101`);
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /orders/:order_id/:product_id - delete product in cart', () => {
    it('should return 200 success - delete success', async (): Promise<void> => {
      const response = await request.delete(`/orders/${orderId}/${productId}`);
      expect(response.status).toBe(200);
      const res = await request.get(`/orders/${orderId}`);
      expect(res.body.products.length).toEqual(1);
    });

    it('should return 200 success - empty cart', async (): Promise<void> => {
      const response = await request.delete(
        `/orders/${orderId}/${productId + 1}`
      );
      expect(response.status).toBe(200);
      const res = await request.get(`/orders/${orderId}`);
      console.log(productId);
      expect(res.body.products.length).toEqual(0);
    });
  });

  afterAll(async () => {
    await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    await request
      .delete(`/products/${++productId}`)
      .set('Authorization', `Bearer ${token}`);
  });
});
