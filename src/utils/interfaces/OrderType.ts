import { ProductTypeResponse } from "./ProductType"
import { UserTypeInformation } from "./UserType"

export enum OrderStatus {
    COMPLETED = "complete",
    ACTIVE = "active",
}

export interface OrderTypeResponse extends OrderTypeRequest{
    orderId: number
}

export interface OrderTypeRequest {
    userId: number,
    status: OrderStatus,
    products: OrderDetailTypeRequest[]
}

export interface OrderDetailTypeResponse {
    product: ProductTypeResponse,
    quantity: number
}

export interface OrderDetailTypeRequest {
    productId: number,
    quantity: number
}

export interface OrderDetailType extends OrderDetailTypeRequest{
    orderId: number
}
