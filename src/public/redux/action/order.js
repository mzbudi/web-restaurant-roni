import axios from 'axios';

export const requestOrder = (config) => {
    return{
        type: 'GET_ORDERS',
        payload: axios.get(`${process.env.REACT_APP_API_HOST}/order`, config)
    }
}