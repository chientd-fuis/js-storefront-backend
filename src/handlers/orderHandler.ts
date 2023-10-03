import express, { Request, Response } from "express";
import { OrderModel } from "../model/order";
import { checkValidateNumber, checkValidateText } from "../utils/functions/validation";
import { OrderDetailType, OrderStatus, OrderTypeRequest } from "../utils/interfaces/OrderType";


const store = new OrderModel();

const getOrders = async (_req: Request, res: Response): Promise<void> => {
    const orderId = parseInt(_req.params.orderId);
    try {
        const order = await store.getOne(orderId);
        res.json(order);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const getOrdersByUserID = async (_req: Request, res: Response): Promise<void> => {
    const userId = checkValidateNumber(_req.query.user_id);
    try {
        const order = await store.getOrderByUserId(userId);
        res.json(order);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const create = async (_req: Request, res: Response): Promise<void> => {
    const products = _req.body.products;
    
    const newOrder: OrderTypeRequest = {
        userId: _req.body.user_id,
        status: OrderStatus.ACTIVE,
        products: products
    }
    try {
        const result = await store.createOrder(newOrder);
        res.json({ order_id: result });
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const changeStatusOrder = async (_req: Request, res: Response): Promise<void> => {
    const orderId = _req.params.orderId;
    const status = checkValidateText(_req.query.status);
    try {
        const order = await store.changeStatusOrder(parseInt(orderId), status);
        res.json(order);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const updateProductInOrder = async (_req: Request, res: Response): Promise<void> => {
    const orderId = _req.params.orderId;
    const productId = _req.params.productId;
    const quality = _req.query.quality;
    try {
        const updateOrder: OrderDetailType = {
            orderId: parseInt(orderId),
            productId: parseInt(productId),
            quantity: checkValidateNumber(quality)
        }
        const order = await store.updateProductInOrder(updateOrder);
        res.json(order);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const deleteProductInOrder = async (_req: Request, res: Response): Promise<void> => {
    const orderId = _req.params.orderId;
    const productId = _req.params.productId;
    try {
        const order = await store.deleteProductInOrder(parseInt(orderId), parseInt(productId));
        res.json(order);
    } catch(err) {
        res.status(400)
        res.json({code: 400, message: `${err}`})
    }
}

const orderHandler = (app: express.Application) => {
    app.get('/orders/:orderId', getOrders);
    app.get('/orders', getOrdersByUserID);
    app.post('/orders/add', create);
    app.put('/orders/:orderId/:productId', updateProductInOrder);
    app.delete('/orders/:orderId/:productId', deleteProductInOrder);
    app.put('/orders/:orderId', changeStatusOrder);
  };

export default orderHandler;