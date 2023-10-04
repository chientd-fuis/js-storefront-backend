import {
  ProductTypeRequest,
  ProductTypeResponse
} from '../utils/interfaces/ProductType';
import { ProductModel } from './product';

const store = new ProductModel();
let productId: number;
describe('Product Model', () => {
  it('should return product when create a product', async () => {
    const prod: ProductTypeRequest = {
      name: 'Product Name 1',
      price: 12
    };
    const result: ProductTypeResponse = await store.create(prod);
    productId = result.id;
    expect(result.name).toEqual('Product Name 1');
    expect(result.price).toEqual(12);
  });

  it('should return list of product when get all products', async () => {
    const result: ProductTypeResponse[] = await store.index();
    expect(result.length).toEqual(3);
    expect(result[2].id).toEqual(productId);
    expect(result[2].name).toEqual('Product Name 1');
    expect(result[2].price).toEqual(12);
  });

  it('should return product when update', async () => {
    const updatePro: ProductTypeResponse = {
      id: productId,
      name: 'Update name',
      price: 99
    };
    const result: ProductTypeResponse = await store.update(updatePro);
    expect(result.id).toEqual(productId);
    expect(result.name).toEqual('Update name');
    expect(result.price).toEqual(99);
  });

  it('should delete success when index', async () => {
    await store.deleteOne(productId);

    const exist: ProductTypeResponse = await store.show(productId);
    expect(exist).toBeUndefined();
  });
});
