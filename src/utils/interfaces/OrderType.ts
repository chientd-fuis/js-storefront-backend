export enum OrderStatus {
  COMPLETED = 'complete',
  ACTIVE = 'active'
}

export interface OrderTypeResponse extends OrderTypeRequest {
  order_id: number;
}

export interface OrderType {
  order_id: number;
  user_id: number;
  status: OrderStatus;
}

export interface OrderTypeRequest extends OrderProductType {
  user_id: number;
  status: OrderStatus;
}

export interface OrderProductType {
  products: OrderDetailTypeRequest[];
}

export interface OrderDetailTypeRequest {
  product_id: number;
  name?: string;
  price?: string;
  quantity: number;
}

export interface OrderDetailType extends OrderDetailTypeRequest {
  order_id: number;
}
