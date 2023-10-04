import {
  OrderDetailType,
  OrderStatus,
  OrderTypeRequest,
  OrderTypeResponse
} from '../utils/interfaces/OrderType';
import { OrderModel } from './order';
import { ProductModel } from './product';
import { UserModel } from './user';

const store = new OrderModel();
const userStore = new UserModel();
const productStore = new ProductModel();
describe('Order Model', () => {
  let user_id: number, product_id: number, order_id: number;

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
    const ord: OrderTypeRequest = {
      user_id: user_id,
      status: OrderStatus.ACTIVE,
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
    const result: OrderTypeResponse = await store.createOrder(ord);
    order_id = result.order_id;
    expect(result.order_id).toEqual(2);
    expect(result.status).toEqual(OrderStatus.ACTIVE);
    expect(result.products.length).toEqual(2);
  });

  it('should return order information when call getOne', async () => {
    const result: OrderTypeResponse = await store.getOne(order_id);
    expect(result.order_id).toEqual(order_id);
    expect(result.status).toEqual(OrderStatus.ACTIVE);
    expect(result.products.length).toEqual(2);
  });

  it('should return order information when call getOrderByUserId', async () => {
    const result: OrderTypeResponse[] = await store.getOrderByUserId(user_id);
    expect(result[0].order_id).toEqual(order_id);
    expect(result[0].status).toEqual(OrderStatus.ACTIVE);
    expect(result[0].products.length).toEqual(2);
  });

  it('should change status when call changeStatusOrder', async () => {
    const result: OrderTypeResponse = await store.changeStatusOrder(
      order_id,
      OrderStatus.COMPLETED
    );
    expect(result.order_id).toEqual(order_id);
    expect(result.status).toEqual(OrderStatus.COMPLETED);
  });

  it('should change quality of product when call updateProductInOrder', async () => {
    const orderDetails: OrderDetailType = {
      order_id: order_id,
      product_id: product_id,
      quantity: 111
    };
    const result: OrderDetailType =
      await store.updateProductInOrder(orderDetails);
    expect(result.order_id).toEqual(order_id);
    expect(result.quantity).toEqual(111);
    expect(result.product_id).toEqual(product_id);
  });

  it('should change quality of product when call updateProductInOrder', async () => {
    const result: OrderDetailType = await store.deleteProductInOrder(
      order_id,
      product_id
    );
    expect(result.order_id).toEqual(order_id);
    expect(result.quantity).toEqual(111);
    expect(result.product_id).toEqual(product_id);
  });
});
