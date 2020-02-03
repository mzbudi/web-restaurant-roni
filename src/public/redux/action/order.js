import axios from 'axios';

export const requestOrder = (config) => {
    return{
        type: 'GET_ORDERS',
        payload: axios.get('http://127.0.0.1:3001/order', config)
    }
}