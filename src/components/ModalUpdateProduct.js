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
import {connect} from 'react-redux'
import {requestProducts, updateProducts} from '../public/redux/action/products'

class ModalUpdateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isOpen: false,
            updateOpen : false,
            category_data:[],
            newProduct : {
                category_id: "5"
            },
            warningModal:false,
            messageWarning : "Proses Berhasil"
        }
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

        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }
        // console.log(this.props.product_id, formData, this.props.auth.data.data.data.token)
        
        this.props.dispatch(updateProducts(this.props.product_id, formData, headers))
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

        //  axios.put(`http://127.0.0.1:3001/products/${this.props.product_id}`,formData, {
        //     headers: {authorization: data.token}
        // })
        //         .then(res => {
        //             if (res.status === 200) {
        //                 try {
        //                     this.setState({
        //                         warningModal:true,
        //                         messageWarning : "Proses Berhasil"
        //                     })
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

    render() {
        const {updateOpen} = this.state
        return(
            <React.Fragment>
            <Button color="dark" onClick={(e)=>{this.handleUpdateClick(e)}}>Update</Button>
            <Modal isOpen={updateOpen} toggle={(e)=>{this.handleUpdateClick(e)}} >
                    <ModalHeader toggle={(e)=>{this.handleUpdateButtonClick(e)}}>Update Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="exampleSelect" sm={2}>Category</Label>
                                <Col sm={10}>
                                <Input type="select" name="select" onChange={(e) => { this.handleCategory(e) }}>
                                    {this.props.category.dataCategory.data.data.map((data)=>{
                                        return(
                                        <option value={data.category_id}>{data.category_name}</option>
                                        )
                                    })}
                                </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="product_name"
                                    placeholder="Product Name"
                                    onChange={(e) => { this.handleName(e) }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    onChange={(e) => { this.handlePrice(e) }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="description" id="description" placeholder="Product Description" onChange={(e) => { this.handleDescription(e) }}/>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Input type="file" name="file" onChange={(e)=>{this.handleImage(e)}} />
                                    <FormText color="muted">
                                        File Harus Ber-Ekstensi Gambar dan Tidak Lebih dari 2 MB
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e)=>{this.handleUpdateButton(e)}}>Submit</Button>{' '}
                        <Button color="secondary" onClick={(e)=>{this.handleUpdateButtonClick(e)}}>Cancel</Button>
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

export default connect(mapStateToProps)(ModalUpdateProduct);