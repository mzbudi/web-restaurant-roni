import axios from 'axios'
import qs from 'qs'

export const requestCategory = (headers) =>{
    return {
        type: 'GET_CATEGORY',
        payload :  axios.get('http://127.0.0.1:3001/category',headers)
    }
}

export const updateCategory = (category_id, dataCategory, headers) =>{
    return {
        type: 'PUT_CATEGORY',
        payload : axios.put(`http://127.0.0.1:3001/category/${category_id}`,dataCategory,headers)
    }
}

export const createCategory = (dataCategory, headers) =>{
    return{
        type: 'CREATE_CATEGORY',
        payload : axios.post('http://127.0.0.1:3001/category',dataCategory,headers)
    }
}

export const deleteCategory = (category_id, headers) =>{
    return{
        type: 'DELETE_CATEGORY',
        payload :  axios.delete(`http://127.0.0.1:3001/category/${category_id}`,headers)
    }
}