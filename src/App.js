import React from 'react';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Sidebar from './components/Sidebar.js';
import {BrowserRouter,
        Switch,
        Route,
        Redirect
      } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';
import ProductList from './pages/ProductList';
import CategoryList from './pages/CategoryList';
import CashierList from './pages/CashierList';
import { connect } from 'react-redux';
import { requestProducts } from './public/redux/action/products';
import { requestLogout } from './public/redux/action/auth';
import { requestCategory } from './public/redux/action/category';
import { addCart } from './public/redux/action/cart';

class App extends React.Component{
  state ={
    isLogin : true
  }

  render(){
    let user_role='2'
    if(this.props.auth.data.length !== 0){
      user_role = this.props.auth.data.data.data.user_role
    }
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={(props)=>(<Home {...props}/>)}/>
          <Route path='/login' render={(props)=>(<Login {...props}/>)}/>
          <Route path='/order' render={(props)=>{return user_role === '1' ? (<Order {...props}/>) : (<Redirect to='/'/>)}}/>
          <Route path='/register' render={(props)=>(<Register {...props}/>)}/>
          <Route path='/products' render={(props)=>{return user_role === '1' ? (<ProductList {...props}/>) : (<Redirect to='/'/>)}}/>
          <Route path='/category' render={(props)=>{return user_role === '1' ? (<CategoryList {...props}/>) : (<Redirect to='/'/>)}}/>
          <Route path='/users' render={(props)=>{return user_role === '1' ? (<CashierList {...props}/>) : (<Redirect to='/'/>)}}/>
        </Switch>
      </BrowserRouter>
    )
  }
}


const mapStateToProps = state => {
  return {
      auth: state.auth,
      products: state.products,
      category: state.category,
      cart: state.cart,
  }
}

export default connect(mapStateToProps)(App);
