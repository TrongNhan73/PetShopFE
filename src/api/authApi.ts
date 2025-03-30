import customAxios from "../config/axios";
import type { GetAccessTokenResponse, LoginRequest, LoginResponse, LogOutResponse, RegisterRequest, RegisterResponse } from "../types";




const sendApiLogin = async (payload: LoginRequest) => {
    let res = await customAxios.post<LoginResponse>('/login', payload);
    return res.data;
}

const sendApiRegister = async (payload: RegisterRequest): Promise<RegisterResponse> => {
    let res = await customAxios.post<RegisterResponse>('/register', payload);
    return res.data;
}


const sendApiGetAccesstoken = async (): Promise<GetAccessTokenResponse> => {
    let res = await customAxios.get<GetAccessTokenResponse>('getnewaccesstoken');
    return res.data;
}


const sendApiLogOut = async (): Promise<LogOutResponse> => {
    let res = await customAxios.get<LogOutResponse>('logout');
    return res.data;
}

export { sendApiLogin, sendApiRegister, sendApiGetAccesstoken, sendApiLogOut }