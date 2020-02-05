import axios from 'axios'
import qs from 'qs'

export const requestLogin = (body) =>{
    return {
        type: 'POST_LOGIN',
        payload :  axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, qs.stringify(body))
    }
}

export const requestRegister = (body) =>{
    return {
        type : 'POST_REGISTER',
        payload : axios.post(`${process.env.REACT_APP_API_HOST}/auth/register`,qs.stringify(body))
    }
}

export const requestLogout = () =>{
    return {
        type: 'LOGOUT'
    }
}