"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderType_1 = require("../utils/interfaces/OrderType");
const order_1 = require("./order");
const product_1 = require("./product");
const user_1 = require("./user");
const store = new order_1.OrderModel();
const userStore = new user_1.UserModel();
const productStore = new product_1.ProductModel();
describe('Order Model', () => {
    let user_id, product_id, order_id;
    beforeAll(async () => {
        const us = await userStore.create({
            first_name: 'John',
            last_name: 'Smith',
            password: 'password'
        });
        user_id = us.user_id;
        const pro1 = await productStore.create({
            name: 'Product 1',
            price: 12
        });
        const pro2 = await productStore.create({
            name: 'Product 2',
            price: 12
        });
        product_id = pro1.id;
    });
    it('should create order success', async () => {
        const ord = {
            user_id: user_id,
            status: OrderType_1.OrderStatus.ACTIVE,
            products: [
                {
                    product_id: product_id,
                    quantity: 10
                },
                {
                    product_id: ++product_id,
                    quantity: 10
                }
            ]
        };
        const result = await store.createOrder(ord);
        order_id = result.order_id;
        expect(result.order_id).toEqual(2);
        expect(result.status).toEqual(OrderType_1.OrderStatus.ACTIVE);
        expect(result.products.length).toEqual(2);
    });
    it('should return order information when call getOne', async () => {
        const result = await store.getOne(order_id);
        expect(result.order_id).toEqual(order_id);
        expect(result.status).toEqual(OrderType_1.OrderStatus.ACTIVE);
        expect(result.products.length).toEqual(2);
    });
    it('should return order information when call getOrderByUserId', async () => {
        const result = await store.getOrderByUserId(user_id);
        expect(result[0].order_id).toEqual(order_id);
        expect(result[0].status).toEqual(OrderType_1.OrderStatus.ACTIVE);
        expect(result[0].products.length).toEqual(2);
    });
    it('should change status when call changeStatusOrder', async () => {
        const result = await store.changeStatusOrder(order_id, OrderType_1.OrderStatus.COMPLETED);
        expect(result.order_id).toEqual(order_id);
        expect(result.status).toEqual(OrderType_1.OrderStatus.COMPLETED);
    });
    it('should change quality of product when call updateProductInOrder', async () => {
        const orderDetails = {
            order_id: order_id,
            product_id: product_id,
            quantity: 111
        };
        const result = await store.updateProductInOrder(orderDetails);
        expect(result.order_id).toEqual(order_id);
        expect(result.quantity).toEqual(111);
        expect(result.product_id).toEqual(product_id);
    });
    it('should change quality of product when call updateProductInOrder', async () => {
        const result = await store.deleteProductInOrder(order_id, product_id);
        expect(result.order_id).toEqual(order_id);
        expect(result.quantity).toEqual(111);
        expect(result.product_id).toEqual(product_id);
    });
});
