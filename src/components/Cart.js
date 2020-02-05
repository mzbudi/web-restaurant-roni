import React from 'react';
import style from '../styles.js';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container,
    Row,
    Col,
    Input,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Pagination, PaginationItem, PaginationLink, ButtonToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Form, FormGroup
} from 'reactstrap';
import cartImage from '../images/cartpict.PNG';
import { connect } from 'react-redux';
import { requestProducts } from '../public/redux/action/products';
import { requestLogout } from '../public/redux/action/auth';
import { requestCategory } from '../public/redux/action/category';
import { addCart, removeCart , emptyCart, incrementCart, decrementCart, createOrder} from '../public/redux/action/cart';
import ModalCheckout from '../components/ModalCheckout'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false,
            cart : []
        }
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

    handleCheckout = (e) => {

        const body = {
            user_id: this.props.auth.data.data.data.user_id,
            orders: this.props.cart.cartData
        }

        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }

        this.props.dispatch(createOrder(body,headers))
            .then(res => {
                this.setState({
                    isOpen : true,
                    cart : this.props.cart.cartData
                },()=>{ this.props.dispatch(emptyCart())
                    console.log(this.state.cart)})
            })

    }

    render() {
        return (
            <div style={style.cartDiv}>
                <div>
                    {this.props.cart.cartData.length === 0 ? '' : (
                        this.props.cart.cartData.map((data, i) => {
                            const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                            // this.handleTotal(totalPerProduct,data.product_id);
                            return (
                                <div style={{ display: "flex" }}>
                                    <div style={style.cartItem}>
                                        <img alt="" src={product_image} height={80} width={80} />
                                    </div>
                                    <div style={style.incrementCart}>
                                        <div style={{ display: "flex" }}>
                                            <Button id={data.product_id} disabled={this.props.cart.cartData[i].quantity == 1 ? true : false} color="info" onClick={(e) => { 
                                                this.props.dispatch(decrementCart(data.product_id))
                                             }}>-</Button>{' '}
                                            <Input type="number" defaultValue={1} value={this.props.cart.cartData[i].quantity} />
                                            <Button id={data.product_id} color="info" onClick={(e) => { this.props.dispatch(incrementCart(data.product_id))}}>+</Button>{' '}
                                        </div>
                                    </div>
                                    <div>Rp. {this.formatRupiah(this.props.cart.cartData[i].product_price * this.props.cart.cartData[i].quantity)}</div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <Button id={data.product_id} color="danger" onClick={(e) => { this.props.dispatch(removeCart(data)) }}>x</Button>{' '}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
                {this.props.cart.cartData.length > 0 ? (<div>
                    <p>Sub Total : Rp. {this.props.cart.grandTotal}</p>
                    <p>PPN : Rp. {this.formatRupiah((this.props.cart.grandTotal*0.10))}</p>
                    <p>Total : Rp. {this.formatRupiah((this.props.cart.grandTotal + (this.props.cart.grandTotal * 0.10)))}</p>
                    <ModalCheckout />
                    {/* <ButtonToggle  onClick={(e) => { this.handleCheckout(e) }} color="info">Checkout</ButtonToggle> */}
                    <ButtonToggle onClick={(e) => { this.props.dispatch(emptyCart()) }} style={style.buttonCheckout} color="danger">Cancel</ButtonToggle></div>) : (<div style={{ textAlign: "center" }}>
                        <img height={250} width={250} src={cartImage} alt="Logo"></img><p>Cart is Empty</p>
                    </div>)}
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

export default connect(mapStateToProps)(Cart)