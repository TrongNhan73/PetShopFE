import type { Response } from "./TempalteResponse.type";


interface DataGetAccessTokenResponse {
    accessToken: string
}
export interface GetAccessTokenResponse extends Response<DataGetAccessTokenResponse | null> { }
export interface LogOutResponse extends Response<null> { }