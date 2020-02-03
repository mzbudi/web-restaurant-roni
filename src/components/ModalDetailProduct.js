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

class ModalDetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            updateOpen : false,
            deleteOpen: false,
            category_data:[],
            newProduct : {
                category_id: "5"
            },
            warningModal:false,
            messageWarning : "Proses Berhasil"
        }
    }

    handleButtonWarning=(e)=>{
        this.setState({
            warningModal : !this.state.warningModal
        })
    }

    handleImage = (e) => {
        this.setState({
            newProduct : {...this.state.newProduct, product_image:e.target.files[0]}
        })
    }

    handlePrice = (e) => {
        this.setState({
            newProduct : {...this.state.newProduct, product_price:e.target.value}
        })
    }

    handleName = (e) => {
        this.setState({
            newProduct : {...this.state.newProduct, product_name:e.target.value}
        })
    }

    handleDescription = (e) => {
        this.setState({
            newProduct : {...this.state.newProduct, product_description:e.target.value}
        })
    }

    handleCategory = (e) => {
        this.setState({
            newProduct : {...this.state.newProduct, category_id:e.target.value}
        })
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

    handleUpdateButton = () => {
        this.setState({
            updateOpen: false
        })
        const formData = new FormData();
        formData.append('category_id',this.state.newProduct.category_id)
        formData.append('product_name',this.state.newProduct.product_name)
        formData.append('product_description',this.state.newProduct.product_description)
        formData.append('product_image',this.state.newProduct.product_image)
        formData.append('product_price',this.state.newProduct.product_price)
        const data = JSON.parse(localStorage.getItem('dataAccount'))

         axios.put(`http://127.0.0.1:3001/products/${this.props.product_id}`,formData, {
            headers: {authorization: data.token}
        })
                .then(res => {
                    if (res.status === 200) {
                        try {
                            this.setState({
                                warningModal:true,
                                messageWarning : "Proses Berhasil"
                            })
                            this.forceUpdate()
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }).catch(err => {
                    localStorage.removeItem('dataAccount');
                    this.props.history.push('/login')
                })
    }

    handleDeleteClick = () => {
        this.setState({
            deleteOpen: true
        })
    }

    handleDeleteButton = () => {
        this.setState({
            deleteOpen: false
        })
    }

    render() {
        const { isOpen,updateOpen } = this.state
        return (
            <div>
                <Button color="dark" onClick={this.handleClick}>Detail</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Detail Product</ModalHeader>
                    <ModalBody>
                        <img width={465} src={"http://localhost:3001/" + this.props.data.product_image.replace('assets', '')}></img>
                        <p>Product Id : {this.props.data.product_id}</p>
                        <p>Category Id : {this.props.data.category_id}</p>
                        <p>Product Description: {this.props.data.product_description}</p>
                        <p>Product Price: {this.props.data.product_price}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleButton}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                {/* update */}
            </div>
        )
    }
}

export default ModalDetailProduct;