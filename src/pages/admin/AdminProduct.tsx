import React from 'react'
import { sendApiGetProduct } from '../../api/productApi'
import { toast } from 'react-toastify';

export default function AdminProduct() {
    const handleGetProduct = async () => {
        try {
            const data = await sendApiGetProduct();
            console.log(data);
        } catch (err) {
            console.log(err);
            toast.error('some err when get product')
        }
    }
    return (
        <div>
            <div>AdminProduct</div>
            <button onClick={handleGetProduct}>click</button>
        </div>)
}
