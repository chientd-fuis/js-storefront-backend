import express, { Request, Response } from "express";
import { ProductModel } from "../model/product";
import { checkValidateNumber, checkValidateText } from "../utils/functions/validation";
import { ProductTypeRequest, ProductTypeResponse } from "../utils/interfaces/ProductType";

const store = new ProductModel();

const create = async (_req: Request, res: Response): Promise<void> => {
    try {
        const product: ProductTypeRequest = {
            name: checkValidateText(_req.body.name),
            price: checkValidateNumber(_req.body.price)
        }
        const result = await store.create(product);
        res.json(result)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}

const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index();
        res.json(products)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}

const getProductById = async (_req: Request, res: Response): Promise<void> => {
    try {
        const productId = _req.params.productId;
        const product = await store.show(parseInt(productId));
        res.json(product)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}

const deleteProduct = async (_req: Request, res: Response): Promise<void> => {
    try {
        const productId = _req.params.productId;
        const product = await store.deleteOne(parseInt(productId));
        res.json(product)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}


const updateProduct = async (_req: Request, res: Response): Promise<void> => {
    try {
        const product: ProductTypeResponse = {
            id: parseInt(_req.params.productId),
            name: checkValidateText(_req.query.name),
            price: checkValidateNumber(_req.query.price),
        }
        const result = await store.update(product);
        res.json(result);
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}

const productHandler = (app: express.Application) => {
    app.post('/products/add', create);
    app.get('/products', getAll);
    app.get('/products/:productId', getProductById);
    app.delete('/products/:productId', deleteProduct);
    app.put('/products/:productId', updateProduct);
  };

export default productHandler;