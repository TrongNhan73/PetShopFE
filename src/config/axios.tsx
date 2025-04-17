import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import * as sessionStorage from "../services/sessionStorage";
import keyname from "../const/key";
import { User } from "../types";

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
    (error: AxiosError): Promise<AxiosError> => {
        console.log(error.status);
        return Promise.reject(error);
    }
);

export default customAxios;
