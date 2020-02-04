import axios from 'axios'
import qs from 'qs'

export const requestProducts = (config) =>{
    return {
        type: 'GET_PRODUCTS',
        payload :  axios.get('http://127.0.0.1:3001/products',config)
    }
}

export const updateProducts = (product_id, formData, headers) => { 
    return {
        type: 'PUT_PRODUCTS',
        payload :  axios.put(`http://127.0.0.1:3001/products/${product_id}`,formData, headers)
    }
}

export const deleteProducts = (product_id, headers) =>{
    return{
        type: 'DELETE_PRODUCTS',
        payload: axios.delete(`http://127.0.0.1:3001/products/${product_id}` , headers)
    }
}

export const createProducts = (formData, headers) => {
    return{
        type: 'CREATE_PRODUCTS',
        payload: axios.post('http://127.0.0.1:3001/products',formData,headers)
    }
}