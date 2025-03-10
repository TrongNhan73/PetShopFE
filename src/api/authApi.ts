import customAxios from "../config/axios";
import type { LoginRequest, RegisterRequest } from "../types";



const sendApiLogin = async (payload: LoginRequest) => {
    let data = await customAxios.post('/login', payload);
    return data;
}

const sendApiRegister = async (payload: RegisterRequest) => {
    let data = await customAxios.post('/register', payload);
    return data;
}

export { sendApiLogin, sendApiRegister }