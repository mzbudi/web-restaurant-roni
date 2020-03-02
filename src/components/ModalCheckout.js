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
    Table,
    Label,
    Input, Col, FormText
} from 'reactstrap';
import style from '../styles';
import { addCart, removeCart, emptyCart, incrementCart, decrementCart, createOrder } from '../public/redux/action/cart';
import { connect } from 'react-redux';

class ModalCheckout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            cart: [],
            invoice: ''
        }
    }

    handleClick = () => {
        this.props.dispatch(emptyCart())
    }

    handleCheckout = (e) => {
        this.setState({
            isOpen: true
        })
        const body = {
            user_id: this.props.auth.data.data.data.user_id,
            orders: this.props.cart.cartData
        }

        const headers = {
            headers: { authorization: this.props.auth.data.data.data.token }
        }

        this.props.dispatch(createOrder(body, headers))
            .then(res => {
                this.setState({
                    isOpen: true,
                    cart: this.props.cart.cartData,
                    grandTotal: this.props.cart.grandTotal,
                    invoice: res.value.data.data.invoice
                })
            })

    }

    formatRupiah = (angka, prefix) => {
        let number_string = angka.toString().replace(/[^,\d]/g, '');
        let split = number_string.split(',');
        let remains = split[0].length % 3;
        let rupiah = split[0].substr(0, remains);
        let thausand = split[0].substr(remains).match(/\d{3}/gi);

        if (thausand) {
            let separator = remains ? '.' : '';
            rupiah += separator + thausand.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }


    handleButton = () => {
        this.setState({
            isOpen: false
        })
    }


    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Button style={style.buttonCheckout} color="dark" onClick={(e) => { this.handleCheckout(e) }}>Checkout</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick}>
                    <ModalHeader>Detail Transaksi Invoice : {this.state.invoice} </ModalHeader>
                    <ModalBody>
                        <Table light>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.cart.map((data, i) => {
                                    return (
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{data.product_name}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.totalPrice}</td>
                                        </tr>
                                    )
                                })}
                            <tr>
                                <td colspan="2"><p>Sub Total : Rp. {this.state.grandTotal}</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><p>PPN : Rp. {this.formatRupiah((this.state.grandTotal * 0.10))}</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><p>Total : Rp. {this.formatRupiah((this.state.grandTotal + (this.state.grandTotal * 0.10)))}</p></td>
                            </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            this.props.dispatch(emptyCart(), () => {
                                this.setState({
                                    isOpen: false
                                })
                            })
                        }}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps)(ModalCheckout);