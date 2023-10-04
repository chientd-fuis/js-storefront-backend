"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
const store = new product_1.ProductModel();
let productId;
describe('Product Model', () => {
    it('should return product when create a product', async () => {
        const prod = {
            name: 'Product Name 1',
            price: 12
        };
        const result = await store.create(prod);
        productId = result.id;
        expect(result.name).toEqual('Product Name 1');
        expect(result.price).toEqual(12);
    });
    it('should return list of product when get all products', async () => {
        const result = await store.index();
        expect(result.length).toEqual(3);
        expect(result[2].id).toEqual(productId);
        expect(result[2].name).toEqual('Product Name 1');
        expect(result[2].price).toEqual(12);
    });
    it('should return product when update', async () => {
        const updatePro = {
            id: productId,
            name: 'Update name',
            price: 99
        };
        const result = await store.update(updatePro);
        expect(result.id).toEqual(productId);
        expect(result.name).toEqual('Update name');
        expect(result.price).toEqual(99);
    });
    it('should delete success when index', async () => {
        await store.deleteOne(productId);
        const exist = await store.show(productId);
        expect(exist).toBeUndefined();
    });
});
