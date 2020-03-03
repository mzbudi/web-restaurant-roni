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
    Input, Col, FormText, Alert
} from 'reactstrap';
import style from '../styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteProducts, requestProducts} from '../public/redux/action/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class ModalDeleteProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            updateOpen : false,
            deleteOpen: false,
            category_data:[],
            alert: false,
            message: ''
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
      const headers = {
        headers : {authorization: this.props.auth.data.data.data.token}
    }
        this.props.dispatch(deleteProducts(this.props.product_id, headers))
            .then( (res) => {
              this.setState({
                alert: true,
                isOpen: false,
                message : res.value.data.data.message,
              })
            }).catch(err => {
              console.log(err);
            })
    }

    onDismissAlert = () => {
      this.setState({
          alert: !this.state.alert
      })
      const headers = {
        headers : {authorization: this.props.auth.data.data.data.token}
    }
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
  }

    render() {
        const { isOpen, message, alert } = this.state
        return (
            <React.Fragment>
               <Alert style={{position:'fixed', zIndex: 2, bottom: "50px", left:'50px'}}
                      color={'success'}
                      isOpen={alert}
                      toggle={this.onDismissAlert}>
                      {message}
                    </Alert>
                <Button onClick={this.handleClick}>
                  Delete{' '}
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
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