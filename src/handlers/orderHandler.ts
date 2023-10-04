import express, { Request, Response } from 'express';
import { OrderModel } from '../model/order';
import { verifyToken } from '../utils/functions/token';
import {
  checkValidateNumber,
  checkValidateText
} from '../utils/functions/validation';
import {
  OrderDetailType,
  OrderStatus,
  OrderTypeRequest
} from '../utils/interfaces/OrderType';

const store = new OrderModel();

const getOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orderId = parseInt(_req.params.orderId);
    const order = await store.getOne(orderId);
    res.json(order);
  } catch (err) {
    res.status(404);
    res.json({ code: 404, message: `${err}` });
  }
};

const getOrdersByUserID = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = checkValidateNumber(_req.query.user_id);
    const order = await store.getOrderByUserId(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ code: 400, message: `${err}` });
  }
};

const create = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = _req.body.products || [];
    const newOrder: OrderTypeRequest = {
      user_id: checkValidateNumber(_req.body.user_id),
      status: OrderStatus.ACTIVE,
      products: products
    };
    const result = await store.createOrder(newOrder);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json({ code: 400, message: `${err}` });
  }
};

const changeStatusOrder = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = _req.params.orderId;
    const status = checkValidateText(_req.query.status);
    const order = await store.changeStatusOrder(parseInt(orderId), status);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ code: 400, message: `${err}` });
  }
};

const updateProductInOrder = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const orderId = _req.params.orderId;
  const productId = _req.params.productId;
  const quality = _req.query.quality;
  try {
    const updateOrder: OrderDetailType = {
      order_id: parseInt(orderId),
      product_id: parseInt(productId),
      quantity: checkValidateNumber(quality)
    };
    const order = await store.updateProductInOrder(updateOrder);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ code: 400, message: `${err}` });
  }
};

const deleteProductInOrder = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const orderId = _req.params.orderId;
  const productId = _req.params.productId;
  try {
    const order = await store.deleteProductInOrder(
      parseInt(orderId),
      parseInt(productId)
    );
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json({ code: 400, message: `${err}` });
  }
};

const orderHandler = (app: express.Application) => {
  app.get('/orders/:orderId',verifyToken, getOrders);
  app.get('/orders',verifyToken, getOrdersByUserID);
  app.post('/orders/add', create);
  app.put('/orders/:orderId/:productId', updateProductInOrder);
  app.delete('/orders/:orderId/:productId', deleteProductInOrder);
  app.put('/orders/:orderId', changeStatusOrder);
};

export default orderHandler;
