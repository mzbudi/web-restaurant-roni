import axios from 'axios'
import qs from 'qs'

export const requestLogin = (body) =>{
    return {
        type: 'POST_LOGIN',
        payload :  axios.post('http://127.0.0.1:3001/auth/login', qs.stringify(body))
    }
}

export const requestRegister = (body) =>{
    return {
        type : 'POST_REGISTER',
        payload : axios.post('http://127.0.0.1:3001/auth/register',qs.stringify(body))
    }
}