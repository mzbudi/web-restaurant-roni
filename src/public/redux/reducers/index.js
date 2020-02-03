import {combineReducers} from 'redux';
import auth from './auth';
import products from './products';
import category from './category';
import users from './users';
import order from './order';
export default combineReducers({
    auth,
    products,
    category,
    users,
    order,
})