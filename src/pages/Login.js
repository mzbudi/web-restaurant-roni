import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Input, FormText, Spinner, ButtonToggle  } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import styles from './styles';


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
        this.handleLogin = this.handleLogin.bind(this)
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

    handleLogin = (e) =>{
        e.preventDefault()
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        this.setState({
            isLoading : true,
        })
        if(data.username === '' && data.password === ''){
            this.setState({
                visibleAlert : true,
                error: "Username dan Password Tidak Boleh Kosong!",
                isLoading : false
            })
        }else{
            const body = qs.stringify(data)
            axios.post('http://127.0.0.1:3001/auth/login',body)
                .then((res)=>{
                    if(res.status === 200){
                        try {
                            localStorage.setItem('dataAccount', JSON.stringify(res.data.data))
                            console.log(res);
                            console.log(JSON.stringify(res))
                        } catch (error) {
                            console.log(error)
                            this.setState({
                                visibleAlert : true,
                                error : "Username Atau Password Salah",
                            })
                        }
                    }
                })
                .catch((error)=>{
                    this.setState({
                        visibleAlert : true,
                        error : "Tidak Ada Koneksi Internet",
                    })
                })
                .finally(()=>{
                    this.setState({
                        isLoading : false,
                    })
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
            <div className='formMaker'>
            <Alert color="danger" isOpen={this.state.visibleAlert} toggle={this.onDismissAlert}>
                {this.state.error}
            </Alert>
            <Form style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                }}>
                <FormGroup>
                    <Input style ={{textAlign:"center",minWidth : '320'}} plaintext value="Login" />
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        style={{minWidth:"320px"}}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Type Username Here"
                        onChange={(e)=>{this.handleUsername(e)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="Password"
                        placeholder="Type Password Here"
                        onChange={(e)=>{this.handlePassword(e)}}
                    />
                </FormGroup>
                {this.state.isLoading ? (<Spinner style={{ width: '3rem', height: '3rem' }} />):(<ButtonToggle onClick={(e)=>{this.handleLogin(e)}} color="secondary">Login</ButtonToggle>)}
            </Form>
            </div>
        )
    }
}

export default Login;

// Login.propTypes = {
//     name: PropTypes.string,
// }
