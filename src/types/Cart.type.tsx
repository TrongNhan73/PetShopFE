import type { ItemCart } from "./ItemCart.type";
export interface Cart {
    products: ItemCart[],
    number: number,
    total: number
}