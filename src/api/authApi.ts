import customAxios from "../config/axios";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types";




const sendApiLogin = async (payload: LoginRequest) => {
    let res = await customAxios.post<LoginResponse>('/login', payload);
    return res.data;
}

const sendApiRegister = async (payload: RegisterRequest): Promise<RegisterResponse> => {
    let res = await customAxios.post<RegisterResponse>('/register', payload);
    return res.data;
}

export { sendApiLogin, sendApiRegister }