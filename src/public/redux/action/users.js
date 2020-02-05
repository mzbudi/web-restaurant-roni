import axios from 'axios'
import qs from 'qs'

export const requestUsers = (headers) =>{
    return {
        type: 'GET_USERS',
        payload :  axios.get(`${process.env.REACT_APP_API_HOST}/users`,headers)
    }
}