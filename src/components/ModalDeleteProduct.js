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
import {connect} from 'react-redux';
import {deleteProducts, requestProducts} from '../public/redux/action/products'

class ModalDeleteProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            updateOpen : false,
            deleteOpen: false,
            category_data:[],
            newProduct : {
                category_id: "5"
            }
        }
    }


    handleClick = () => {
        this.setState({
            isOpen: true
        })
    }

    handleButton = () => {
        this.setState({
            isOpen: false
        })
    }


    handleDeleteClick = () => {
        this.setState({
            isOpen: false
        })

        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }
        // console.log(this.props.product_id, formData, this.props.auth.data.data.data.token)
        
        this.props.dispatch(deleteProducts(this.props.product_id, headers))
            .then( (res) => {
                const dataProducts = {
                    params:{
                        nameSearch : '',
                        category_id : '',
                        limit : '1000',
                        page : 0,
                        product_name : '',
                        date : '',
                    }
                }
                this.props.dispatch(requestProducts(dataProducts,headers))
            })
        // const data = JSON.parse(localStorage.getItem('dataAccount'))

        //  axios.delete(`http://127.0.0.1:3001/products/${this.props.product_id}`, {
        //     headers: {authorization: data.token}
        // })
        //         .then(res => {
        //             if (res.status === 200) {
        //                 try {
        //                     this.forceUpdate()
        //                 } catch (error) {
        //                     console.log(error)
        //                 }
        //             }
        //         }).catch(err => {
        //             localStorage.removeItem('dataAccount');
        //             this.props.history.push('/login')
        //         })
    }

    render() {
        const { isOpen } = this.state
        return (
            <React.Fragment>
                <Button onClick={this.handleClick}>Delete</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick}>
                    <ModalHeader toggle={this.handleButton}>Detail Product</ModalHeader>
                    <ModalBody>
                        <p>Apakah Anda Yakin Menghapus ini ?</p>
                    </ModalBody>
                    <ModalFooter>
                    <Button style={style.buttonSidebar} color="dark" onClick={(e)=>{this.handleDeleteClick(e)}}>Delete</Button>{' '}
                    <Button style={style.buttonSidebar} onClick={(e)=>{this.handleButton(e)}}>Cancel</Button>{' '}
                        </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        products : state.products,
        category : state.category

    }
}

export default connect(mapStateToProps)(ModalDeleteProduct);