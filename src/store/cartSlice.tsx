import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index.js";
import type { Cart, ItemCart } from '../types'

const initialState: Cart = {
    products: [],
    total: 0,
    number: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ItemCart>) => {
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
            state.number++;
        },
        removeToCart: (state, action: PayloadAction<ItemCart>) => {
            if (state.number <= 1) {
                state = { ...initialState }
            } else {
                state.products = state.products.filter(({ product_id }) => product_id !== action.payload.product_id);
                state.number--;
                state.total -= action.payload.price * action.payload.quantity;
            }
        }
    }
})


export const { addToCart, removeToCart } = cartSlice.actions
export default cartSlice.reducer