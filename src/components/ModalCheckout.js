import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import plus from '../images/plus.png'
import axios from 'axios';
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

class ModalDetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    handleClick = () => {
        this.setState({
            isOpen: true
        })
        const data = JSON.parse(localStorage.getItem('dataAccount'))

        const body ={
            user_id : data.user_id,
            orders : this.state.orders
        }

        axios.post('http://127.0.0.1:3001/order/', body)
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            cart:[],
                            orders:[],
                            grandTotal : 0,
                            modalCheckoutOpen : true
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }).catch(err => {
                console.log(err)
            })

        console.log(body)
    }

    handleButton = () => {
        this.setState({
            isOpen: false
        })
    }

    
    render() {
        const { isOpen } = this.state
        const {orders} = this.props
        return (
            <div>
                <Button color="dark" onClick={this.handleClick}>Checkout</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Detail Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <p>Pesanan Sudah Di Input</p>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleButton}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.handleButton}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ModalDetailProduct;