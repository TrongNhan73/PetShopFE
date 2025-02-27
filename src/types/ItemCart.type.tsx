import type { Product } from "./Product.type.tsx";
export interface ItemCart extends Product {
    quantity: number,
    total: number
}