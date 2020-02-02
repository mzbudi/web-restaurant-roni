import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Input, FormText, Spinner, ButtonToggle  } from 'reactstrap';
import style from '../styles';
import {requestLogin} from '../public/redux/action/auth';
import {requestProducts} from '../public/redux/action/products';
import {requestCategory} from '../public/redux/action/category';
import {requestUsers} from '../public/redux/action/users';
import {connect} from 'react-redux'
import qs from 'qs';
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            visibleAlert : false,
            error : "",
            isLoading : false
        }
    }

    componentDidMount(){
        // const data = JSON.parse(localStorage.getItem('dataAccount'))
        const data = JSON.parse(localStorage.getItem('persist:root'))
        // console.log(data.auth);
        if(data.auth.data){
            this.props.history.push('/')
        }
    }

    handleUsername = (e) =>{
        this.setState({
            username : e.target.value
        })
    }

    handlePassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    handleRegister = (e) =>{
        this.props.history.push('/register')
    }

    handleLogin = (e) =>{
        e.preventDefault()
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        
        if(data.username === '' && data.password === ''){
            this.setState({
                visibleAlert : true,
                error: "Username dan Password Tidak Boleh Kosong!",
                isLoading : false,
            })
        }else{
            this.props.dispatch(requestLogin(data))
                .then( (res) => {
                    const headers = {authorization: res.value.data.data.token}
                    const configCategory = {
                        headers
                    }
                    const config = {
                        headers,
                        params:{
                            nameSearch : '',
                            category_id : '',
                            limit : '1000',
                            page : 0,
                            product_name : '',
                            date : '',
                        }
                    }
                    if(this.props.auth.data.data.data.user_role === '1'){
                        this.props.dispatch(requestUsers());
                    }
                    this.props.dispatch(requestProducts(config));
                    this.props.dispatch(requestCategory(configCategory));
                    this.props.history.push('/')
                }).catch((err)=>{
                    this.setState({
                        visibleAlert : true,
                        error: this.props.auth.message,
                        isLoading : false,
                    })
                    console.log(err)
                })
        }

    }

    onDismissAlert = () => {
        this.setState({
            visibleAlert : !this.state.visibleAlert
        })
    }
    render() {
        return (
            <div>
            <Alert color="danger" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert}>
                {this.state.error}
            </Alert>
            <Form style={style.formMaker}>
                <FormGroup>
                    <Input
                        style={style.inputLogin}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={(e)=>{this.handleUsername(e)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        name="password"
                        id="Password"
                        placeholder="Password"
                        onChange={(e)=>{this.handlePassword(e)}}
                    />
                </FormGroup>
                <div>{this.props.auth.isLoading ? 
                    (<Spinner style={style.spinnerLogin} />)
                    :
                    (<ButtonToggle style={style.buttonLogin} onClick={(e)=>{this.handleLogin(e)}} color="secondary">Login</ButtonToggle>)
                }</div>
                <div>
                    <ButtonToggle style={style.buttonRegister} onClick={(e)=>{this.handleRegister(e)}} color="success">Register</ButtonToggle>
                </div>
            </Form>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        auth: state.auth,
        products : state.products,
        category : state.category,
    }
}

// const mapToData 
export default connect(mapStateToProps)(Login);

Input.propTypes = {
    children: PropTypes.node,
    // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
    type: PropTypes.string,
    size: PropTypes.string,
    bsSize: PropTypes.string,
    valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
    invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    plaintext: PropTypes.bool,
    addon: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object,
  };

//   const style = {
//       formMaker : {
//         position: 'absolute',
//         left: '50%',
//         top: '50%',
//         transform: 'translate(-50%, -50%)',
//         }
//   }