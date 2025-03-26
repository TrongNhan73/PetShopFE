import type { Response } from "./TempalteResponse.type";

export interface LoginRequest {
    email: string,
    password: string
}

interface DataResponse {
    accessToken: string,
    refreshToken: string
}
export interface LoginResponse extends Response<DataResponse | null> { };