import React from 'react';
import NavbarNavigation from './components/NavbarNavigation.js';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Sidebar from './components/Sidebar.js';
import {BrowserRouter,
        Switch,
        Route
      } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';

class App extends React.Component{
  state ={
    isLogin : true
  }

  componentDidMount(){
    const data = JSON.parse(localStorage.getItem('dataAccount'))
    if(!data){
      this.setState({
        isLogin: false
      })
    }
  }

  render(){
    return(
      <BrowserRouter>
      {/* <NavbarNavigation /> */}
      {this.state.isLogin ? <Sidebar {...this.props} /> : ''}
        <Switch>
          <Route path='/' exact render={(props)=>(<Home {...props}/>)}/>
          <Route path='/login' render={(props)=>(<Login {...props}/>)}/>
          <Route path='/order' render={(props)=>(<Order {...props}/>)}/>
          <Route path='/register' render={(props)=>(<Register {...props}/>)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;
