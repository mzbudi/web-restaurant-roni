import {combineReducers} from 'redux';
import auth from './auth';
import products from './products';
import category from './category';
export default combineReducers({
    auth,
    products,
    category
})