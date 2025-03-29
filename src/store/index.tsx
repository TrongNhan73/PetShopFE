import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import { Cart, User } from '../types'
import * as localservice from '../services/localStorage'
import * as sessionservice from '../services/sessionStorage'
import keyname from '../const/key'

const preloadState = () => {
    const data = {
        cart: {
            products: [],
            total: 0,
            number: 0
        },
        user: {
            email: null,
            phone: null,
            address: null,
            access_token: null,
            user_name: null,
            role_id: null
        }
    }

    const datauser = sessionservice.getData(keyname.userdata);

    const datacart = localservice.getData(keyname.cartdata);
    if (datauser.access_token) {

        data.user = datauser;

    }
    if (datacart.number) {
        data.cart = datacart;
    }
    return data;
}

const store = configureStore({

    reducer: {
        user: userReducer,
        cart: cartReducer
    },
    preloadedState: preloadState()
})

store.subscribe(() => {
    let state = store.getState();
    if (state.cart) {
        let data = JSON.stringify(state.cart);
        localservice.saveData(keyname.cartdata, data);
    }
    if (state.user) {
        let data = JSON.stringify(state.user);
        sessionservice.saveData(keyname.userdata, data);
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;