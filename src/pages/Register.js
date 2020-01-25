import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Form, FormGroup, Label, Input, FormText, Spinner, ButtonToggle  } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username : "",
            password : "",
            visibleAlert : false,
            error : "",
            isLoading : false
        }
        this.handleRegister = this.handleRegister.bind(this)
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

    handleName = (e) =>{
        this.setState({
            name: e.target.value
        })
    }

    handleRegister = (e) =>{
        e.preventDefault()
        const data = {
            username : this.state.username,
            password : this.state.password,
            name : this.state.name
        }
        this.setState({
            isLoading : true,
        })
        if(data.username === '' && data.password === '' && data.name === ''){
            this.setState({
                visibleAlert : true,
                error: "Data Tidak Boleh Kosong!",
                isLoading : false
            })
        }else{
            const body = qs.stringify(data)
            axios.post('http://127.0.0.1:3001/auth/register',body)
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
                                error : "Username Sudah Ada",
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
            <div>
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
                    <Label for="Register">Restaurant Roni</Label>
                    <Input plaintext value="Register" />
                </FormGroup>
                <FormGroup>
                    <Label for="username">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Type Your Name"
                        onChange={(e)=>{this.handleName(e)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Type Username"
                        onChange={(e)=>{this.handleUsername(e)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="Password"
                        placeholder="password placeholder"
                        onChange={(e)=>{this.handlePassword(e)}}
                    />
                </FormGroup>
                
                {this.state.isLoading ? (<Spinner style={{ width: '3rem', height: '3rem' }} />):(<ButtonToggle onClick={(e)=>{this.handleRegister(e)}} color="secondary">Submit</ButtonToggle>)}
            </Form>
            </div>
        )
    }
}

export default Register;

// Login.propTypes = {
//     name: PropTypes.string,
// }
