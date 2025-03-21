import customAxios from "../config/axios";
import type { LoginRequest, RegisterRequest, RegisterResponse } from "../types";




const sendApiLogin = async (payload: LoginRequest) => {
    let data = await customAxios.post('/login', payload);
    return data;
}

const sendApiRegister = async (payload: RegisterRequest): Promise<RegisterResponse> => {
    let res = await customAxios.post<RegisterResponse>('/register', payload);
    return res.data;
}

export { sendApiLogin, sendApiRegister }