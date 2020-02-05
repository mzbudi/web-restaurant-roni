import axios from 'axios'
import qs from 'qs'

export const requestCategory = (headers) =>{
    return {
        type: 'GET_CATEGORY',
        payload :  axios.get(`${process.env.REACT_APP_API_HOST}/category`,headers)
    }
}

export const updateCategory = (category_id, dataCategory, headers) =>{
    return {
        type: 'PUT_CATEGORY',
        payload : axios.put(`${process.env.REACT_APP_API_HOST}/${category_id}`,dataCategory,headers)
    }
}

export const createCategory = (dataCategory, headers) =>{
    return{
        type: 'CREATE_CATEGORY',
        payload : axios.post(`${process.env.REACT_APP_API_HOST}/category`,dataCategory,headers)
    }
}

export const deleteCategory = (category_id, headers) =>{
    return{
        type: 'DELETE_CATEGORY',
        payload :  axios.delete(`${process.env.REACT_APP_API_HOST}/${category_id}`,headers)
    }
}