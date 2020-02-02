import axios from 'axios'
import qs from 'qs'

export const requestCategory = (headers) =>{
    return {
        type: 'GET_CATEGORY',
        payload :  axios.get('http://127.0.0.1:3001/category',headers)
    }
}