"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const OrderType_1 = require("../utils/interfaces/OrderType");
const request = (0, supertest_1.default)(server_1.default);
describe("Order Handler", () => {
    const userData = {
        first_name: "Chien TEST",
        last_name: "TD TEST",
        password: "password123"
    };
    let token, userId = 1, productId, orderId;
    beforeAll(async () => {
        const response = await request.post("/users/sign-up")
            .send(userData);
        userId = response.body.user_id;
        token = response.body.token;
        const product1 = { name: 'Product Name 1', price: 99 };
        const productRes = await request.post("/products/add")
            .set('Authorization', `Bearer ${token}`)
            .send(product1);
        productId = productRes.body.id;
        const product2 = { name: 'Product Name 2', price: 99 };
        await request.post("/products/add")
            .set('Authorization', `Bearer ${token}`)
            .send(product2);
    });
    describe("POST /orders/add", () => {
        it('should return 400 when missing params', async () => {
            const response = await request.post("/orders/add")
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
        it('should return 401 when invalid token', async () => {
            const order = {
                user_id: userId,
                status: OrderType_1.OrderStatus.ACTIVE,
                products: [{
                        product_id: productId,
                        quantity: 100
                    }]
            };
            const response = await request.post("/orders/add")
                .send(order);
            expect(response.status).toBe(401);
        });
        it('should return 200 success', async () => {
            const order = {
                user_id: userId,
                products: [{
                        product_id: productId,
                        quantity: 100
                    }]
            };
            const response = await request.post("/orders/add")
                .set('Authorization', `Bearer ${token}`)
                .send(order);
            orderId = response.body.order_id;
            expect(response.status).toBe(200);
            expect(response.body.order_id).toEqual(1);
            expect(response.body.user_id).toEqual(userId);
            expect(response.body.products.length).toEqual(1);
        });
    });
    describe("GET /orders/:order_id", () => {
        it('should return 200 success', async () => {
            const response = await request.get(`/orders/${orderId}`);
            expect(response.status).toBe(200);
            expect(response.body.order_id).toEqual(1);
            expect(response.body.user_id).toEqual(userId);
            expect(response.body.products.length).toEqual(1);
        });
        it('should return 404 not found', async () => {
            const response = await request.get("/orders/2");
            expect(response.status).toBe(404);
            expect(response.body.order_id).toBeUndefined();
        });
    });
    describe("GET /orders", () => {
        it('should return 400 when missing params', async () => {
            const response = await request.get("/orders");
            expect(response.status).toBe(400);
        });
        it('should return 200 success', async () => {
            const response = await request.get(`/orders?user_id=${userId}`);
            expect(response.status).toBe(200);
            expect(response.body.length).toEqual(1);
            expect(response.body[0].user_id).toEqual(userId);
            expect(response.body[0].products.length).toEqual(1);
        });
    });
    describe("PUT /orders/:order_id - update status", () => {
        it('should return 400 when missing status params', async () => {
            const response = await request.put(`/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
        it('should return 401 when invalid token', async () => {
            const response = await request.put(`/orders/${orderId}`);
            expect(response.status).toBe(401);
        });
        it('should return 200 success', async () => {
            const response = await request.put(`/orders/${orderId}?status=${OrderType_1.OrderStatus.COMPLETED}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.order_id).toEqual(1);
            expect(response.body.status).toEqual(OrderType_1.OrderStatus.COMPLETED);
            expect(response.body.user_id).toEqual(userId);
        });
    });
    describe("PUT /orders/:order_id/:product_id - update product", () => {
        it('should return 400 when missing status params', async () => {
            const response = await request.put(`/orders/${orderId}/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
        it('should return 401 when invalid token', async () => {
            const response = await request.put(`/orders/${orderId}/${productId}?quality=101`);
            expect(response.status).toBe(401);
        });
        it('should return 200 success - only change quality', async () => {
            const response = await request.put(`/orders/${orderId}/${productId}?quality=111`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.product_id).toEqual(1);
            expect(response.body.quantity).toEqual(111);
        });
        it('should return 200 success - add new exist product', async () => {
            const response = await request.put(`/orders/${orderId}/${productId + 1}?quality=101`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.product_id).toEqual(2);
            expect(response.body.quantity).toEqual(101);
            const res = await request.get(`/orders/${orderId}`);
            expect(res.body.products.length).toEqual(2);
        });
        it('should return 400 - when not found product id', async () => {
            const response = await request.put(`/orders/${orderId}/99?quality=101`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
    });
    describe("DELETE /orders/:order_id/:product_id - delete product in cart", () => {
        it('should return 401 when invalid token', async () => {
            const response = await request.delete(`/orders/${orderId}/${productId}`);
            expect(response.status).toBe(401);
        });
        it('should return 200 success - delete success', async () => {
            const response = await request.delete(`/orders/${orderId}/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const res = await request.get(`/orders/${orderId}`);
            expect(res.body.products.length).toEqual(1);
        });
        it('should return 200 success - empty cart', async () => {
            const response = await request.delete(`/orders/${orderId}/${productId + 1}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const res = await request.get(`/orders/${orderId}`);
            console.log(productId);
            expect(res.body.products.length).toEqual(0);
        });
    });
    afterAll(async () => {
        await request.delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        await request.delete(`/products/${productId}`).set('Authorization', `Bearer ${token}`);
        await request.delete(`/products/${++productId}`).set('Authorization', `Bearer ${token}`);
    });
});
