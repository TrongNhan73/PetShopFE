import { Response } from "./TempalteResponse.type";
export interface RegisterRequest {
    email: string,
    username: string,
    phone: string,
    password: string
}

export interface RegisterResponse extends Response<null> { };