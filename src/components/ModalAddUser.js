import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input, Col, FormText,Container, Row, Alert, Spinner, ButtonToggle
} from 'reactstrap';
import style from '../styles';
import axios from 'axios';
import {requestRegister} from '../public/redux/action/auth';
import {requestUsers} from '../public/redux/action/users';
import {connect} from 'react-redux'

class ModalAddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            username : "",
            password : "",
            name : "",
            visibleAlert : false,
            error : "",
            alertColor : 'danger',
            isLoading : false,
            message : '',
            
        }
    }

    handleButton = () => {
        this.setState({
            isOpen: false
        })
    }

    handleClick = () => {
        this.setState({
            isOpen: true
        })
    }
    onDismissAlert = () => {
        this.setState({
            visibleAlert : !this.state.visibleAlert
        })
    }


    handleUsername = (e) =>{
        this.setState({
            username : e.target.value
        })
    }

    handleName = (e) =>{
        this.setState({
            name : e.target.value
        })
    }

    handlePassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    handleRegister = (e) =>{
        e.preventDefault()
        const data = {
            username : this.state.username,
            password : this.state.password,
            name : this.state.name
        }
        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }
        this.setState({
            isLoading : true,
        })
        if(((data.username == '' || data.password == '') || data.name == '')){
            this.setState({
                visibleAlert : true,
                error: "Data Tidak Boleh Kosong!",
                alertColor:"danger",
                isOpen: false
            })
        }else{
            this.props.dispatch(requestRegister(data))
            .then((res)=>{
                if(res.value.data.status == 200){
                    this.setState({
                        error : res.value.data.data.message, 
                        alertColor:"success" ,
                        visibleAlert : true,
                        isOpen: false});
                    this.props.dispatch(requestUsers(headers))
                }else if(res.value.data.status == 304){
                    this.setState({
                        error : res.value.data.data.message, 
                        alertColor:"danger" ,
                        visibleAlert : true,
                        isOpen: false});
                    this.props.dispatch(requestUsers(headers))
                }
            })
            .catch((error)=>{
                this.setState({
                    error:"Username Sudah Ada",
                    alertColor:"danger" ,
                    visibleAlert : true,
                    isOpen: false
                })
            })
            .finally(()=>{
                this.setState({
                    isLoading : false,
                })
            })
        }

    }

    render() {
        const {isOpen} = this.state
        return (
            <div>
                <Alert color={this.state.alertColor} isOpen={this.state.visibleAlert} toggle={this.onDismissAlert}>
                {this.state.error}
                </Alert>
                <Button style={style.buttonAddProduct} color="dark" onClick={this.handleClick}>+ User</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>User</ModalHeader>
                    <ModalBody>
                    <Form>
                <FormGroup>
                    <Input
                        style={style.inputRegister}
                        type="text"
                        name="Name"
                        id="Name"
                        placeholder="Name"
                        onChange={(e)=>{this.handleName(e)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        style={style.inputRegister}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={(e)=>{this.handleUsername(e)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        style={style.inputRegister}
                        type="password"
                        name="password"
                        id="Password"
                        placeholder="Password"
                        onChange={(e)=>{this.handlePassword(e)}}
                    />
                </FormGroup>
                </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { this.handleRegister(e) }}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.handleButton}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        auth: state.auth,
        category: state.category,
        user : state.user
    }
}

export default connect(mapStateToProps)(ModalAddUser);