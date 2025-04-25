import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import * as sessionStorage from "../services/sessionStorage";
import keyname from "../const/key";
import { User } from "../types";
import { toast } from "react-toastify";
import { original } from "@reduxjs/toolkit";
import { sendApiGetAccesstoken } from "../api/authApi";
import decodeAcessToken from "../services/jwt";
import store from "../store";
import { setUser } from "../store/userSlice";


interface FailedRequest {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}
interface cusConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}


let isGettingNewAccessToken = false;
let UnauthenticatedError: FailedRequest[] = [];
const processQueue = (error: any, token: string | null = null) => {
    UnauthenticatedError.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token as string);
        }
    });
    UnauthenticatedError = [];
};



const customAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_SERVER as string,
    withCredentials: true,
});

customAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const dataUser: User | null = sessionStorage.getData(keyname.userdata);
        if (dataUser?.access_token) {
            config.headers["Authorization"] = "Bearer " + dataUser.access_token;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

customAxios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: AxiosError): Promise<AxiosError> => {
        switch (error.status) {
            case 401: {
                console.log('AC expired, getting new AC');
                if (error.config) {
                    let originalRequest: cusConfig = error.config;

                    if (!originalRequest._retry) {
                        originalRequest._retry = true;

                        if (isGettingNewAccessToken) {
                            return new Promise((resolve, reject) => {
                                UnauthenticatedError.push({
                                    resolve: (token: string) => {
                                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                                        resolve(customAxios(originalRequest))
                                    },
                                    reject: (err) => reject(err),
                                })
                            });
                        }


                        isGettingNewAccessToken = true;

                        try {
                            const res = await sendApiGetAccesstoken();
                            console.log(res);

                            if (+res.code === 1) {
                                if (res.data?.accessToken) {
                                    const jwtinfo = decodeAcessToken(res.data?.accessToken);

                                    //sua token ben trong header
                                    originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;

                                    //chay cac request loi
                                    processQueue(null, res.data.accessToken);

                                    //luu thong tin va token moi
                                    store.dispatch(
                                        setUser({
                                            email: jwtinfo.email,
                                            phone: jwtinfo.phone,
                                            address: jwtinfo.address,
                                            access_token: res.data.accessToken,
                                            user_name: jwtinfo.user_name,
                                            role_id: jwtinfo.role_id,
                                            img_url: jwtinfo.img_url
                                        })
                                    );
                                    return customAxios(originalRequest);

                                }
                            } else {
                                toast.warning('Your login session has expired, please log in again');
                                return Promise.reject('RT is expired')
                                // localService.deleteData(keyname.isAuthenticated)
                            }
                        }
                        catch (e) {
                            console.log(e);
                            return Promise.reject(e)
                        }
                        finally {
                            isGettingNewAccessToken = false
                        }



                    }


                }
                break;
            };
            case 403: {
                toast.error('You can\'t access this resource ');
                break;
            }
            default: { }
        }
        return Promise.reject(error);
    }
);

export default customAxios;
