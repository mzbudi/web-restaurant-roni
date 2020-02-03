import axios from 'axios'
import qs from 'qs'

export const requestUsers = (headers) =>{
    return {
        type: 'GET_USERS',
        payload :  axios.get('http://127.0.0.1:3001/users',headers)
    }
}