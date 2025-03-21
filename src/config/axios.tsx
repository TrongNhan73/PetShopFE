import axios from "axios";


const customAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_SERVER
});

customAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {

    return Promise.reject(error);
});

customAxios.interceptors.response.use(function (response) {

    return response;
}, function (error) {

    return Promise.reject(error);
});


export default customAxios;