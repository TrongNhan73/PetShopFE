import customAxios from "../config/axios";

const sendApiGetProduct = async () => {
    let res = await customAxios.get('/getproducts');
    return res.data;
}

export { sendApiGetProduct }