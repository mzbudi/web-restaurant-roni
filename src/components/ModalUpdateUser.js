import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import plus from '../images/plus.png'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input, Col, FormText
} from 'reactstrap';
import style from '../styles';
import axios from 'axios';
import ModalDeleteProduct from './ModalDeleteProduct';
import { connect } from 'react-redux'
import { requestUsers } from '../public/redux/action/users'

class ModalUpdateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            updateOpen: false,
            Password:'',
            name: this.props.name,
            role: this.props.user_role,
            warningModal: false,
            messageWarning: "Proses Berhasil"
        }
    }

    handleUpdateButton = () => {
        this.setState({
            updateOpen: false
        })

        const headers = {
            headers: { authorization: this.props.auth.data.data.data.token }
        }
        const body = {
            name: this.state.name,
            user_role: '2',
            password: this.state.password
        }
        // console.log(this.props.product_id, formData, this.props.auth.data.data.data.token)

        // this.props.dispatch(updateProducts(this.props.product_id, formData, headers))
        //     .then( (res) => {
        //         const dataProducts = {
        //             params:{
        //                 nameSearch : '',
        //                 category_id : '',
        //                 limit : '1000',
        //                 page : 0,
        //                 product_name : '',
        //                 date : '',
        //             }
        //         }
        //         this.props.dispatch(requestProducts(dataProducts,headers))
        //     })
        // const data = JSON.parse(localStorage.getItem('dataAccount'))

        axios.put(`http://127.0.0.1:3001/users/${this.props.user_id}`, body, headers)
            .then(res => {
                if (res.status === 200) {
                    try {
                        // this.setState({
                        //     warningModal:true,
                        //     messageWarning : "Proses Berhasil"
                        // })
                        this.props.dispatch(requestUsers(headers))
                    } catch (error) {
                        console.log(error)
                    }
                }
            }).catch(err => {
                console.log(err)
            })
    }

    handleUpdateClick = () => {
        this.setState({
            updateOpen: true
        })
    }

    handleUpdateButtonClick = () => {
        this.setState({
            updateOpen: false
        })
    }

    handlePassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value
        }, () => {
            console.log(this.state.name)
        })
    }


    handleUserRole = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    render() {
        const { updateOpen , password, name } = this.state
        return (
            <React.Fragment>
                <Button style={{ marginBottom: "10px" }} color="dark" onClick={(e) => { this.handleUpdateClick(e) }}>Update</Button>
                <Modal isOpen={updateOpen} toggle={(e) => { this.handleUpdateClick(e) }} >
                    <ModalHeader toggle={(e) => { this.handleUpdateButtonClick(e) }}>Update User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <p>User Id : {this.props.user_id}</p>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={this.props.data.name}
                                    onChange={(e) => { this.handleName(e) }}
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleSelect" sm={2}>Role</Label>
                                <Col sm={10}>
                                    <Input type="select" name="select" onChange={(e) => { this.handleUserRole(e) }}>
                                        <option value={"1"}>{"Admin"}</option>
                                        <option selected value={"2"}>{"Cashier"}</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    style={style.inputRegister}
                                    type="password"
                                    name="password"
                                    id="Password"
                                    placeholder="Password"
                                    onChange={(e) => { this.handlePassword(e) }}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { this.handleUpdateButton(e) }}>Submit</Button>{' '}
                        <Button color="secondary" onClick={(e) => { this.handleUpdateButtonClick(e) }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        products: state.products,
        category: state.category,
        users: state.users,
    }
}

export default connect(mapStateToProps)(ModalUpdateUser);