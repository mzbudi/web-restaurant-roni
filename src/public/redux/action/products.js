import axios from 'axios'
import qs from 'qs'

export const requestProducts = (config) =>{
    return {
        type: 'GET_PRODUCTS',
        payload :  axios.get(`${process.env.REACT_APP_API_HOST}/products`,config)
    }
}

export const updateProducts = (product_id, formData, headers) => { 
    return {
        type: 'PUT_PRODUCTS',
        payload :  axios.put(`${process.env.REACT_APP_API_HOST}/products/${product_id}`,formData, headers)
    }
}

export const deleteProducts = (product_id, headers) =>{
    return{
        type: 'DELETE_PRODUCTS',
        payload: axios.delete(`${process.env.REACT_APP_API_HOST}/products/${product_id}` , headers)
    }
}

export const createProducts = (formData, headers) => {
    return{
        type: 'CREATE_PRODUCTS',
        payload: axios.post(`${process.env.REACT_APP_API_HOST}/products`,formData,headers)
    }
}