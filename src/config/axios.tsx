import axios from "axios";


const customAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_SERVER
});


export default customAxios;