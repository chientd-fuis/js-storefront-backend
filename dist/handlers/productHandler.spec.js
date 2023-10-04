"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Product Handler', () => {
    const userData = {
        first_name: 'Chien',
        last_name: 'TD',
        password: 'password123'
    };
    let token, userId, productId;
    beforeAll(async () => {
        const response = await request.post('/users/sign-up').send(userData);
        userId = response.body.user_id;
        token = response.body.token;
    });
    describe('POST /products/add', () => {
        it('should return 400 when missing params', async () => {
            const response = await request
                .post('/products/add')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
        it('should return 401 when invalid token', async () => {
            const product = { name: 'Product Name', price: 99 };
            const response = await request.post('/products/add').send(product);
            expect(response.status).toBe(401);
        });
        it('should return 200 success', async () => {
            const product = { name: 'Product Name', price: 99 };
            const response = await request
                .post('/products/add')
                .set('Authorization', `Bearer ${token}`)
                .send(product);
            productId = response.body.id;
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual('Product Name');
            expect(response.body.price).toEqual(99);
        });
    });
    describe('GET /products/:product_id', () => {
        it('should return 200 success', async () => {
            const response = await request.get(`/products/${productId}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(productId);
            expect(response.body.name).toEqual('Product Name');
            expect(response.body.price).toEqual(99);
        });
    });
    describe('GET /products', () => {
        it('should return 200 success', async () => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
            expect(response.body.length).toEqual(1);
            expect(response.body[0].id).toEqual(productId);
            expect(response.body[0].name).toEqual('Product Name');
            expect(response.body[0].price).toEqual(99);
        });
    });
    describe('PUT /products/:product_id', () => {
        it('should return 400 when missing params', async () => {
            const response = await request
                .put(`/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
        it('should return 401 when invalid token', async () => {
            const response = await request.put(`/products/${productId}?name=UpdateName&price=100`);
            expect(response.status).toBe(401);
        });
        it('should return 200 success', async () => {
            const response = await request
                .put(`/products/${productId}?name=UpdateName&price=100`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(productId);
            expect(response.body.name).toEqual('UpdateName');
            expect(response.body.price).toEqual(100);
        });
    });
    describe('DELETE /products/:product_id', () => {
        it('should return 401 when invalid token', async () => {
            const response = await request.delete(`/products/${productId}`);
            expect(response.status).toBe(401);
        });
        it('should return 200 success', async () => {
            const response = await request
                .delete(`/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(productId);
            expect(response.body.name).toEqual('UpdateName');
            expect(response.body.price).toEqual(100);
        });
    });
    afterAll(async () => {
        await request.delete(`/users/${userId}`);
    });
});
