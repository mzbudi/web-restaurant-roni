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
    Input, Col, FormText,Container, Alert
} from 'reactstrap';
import style from '../styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {requestCategory} from '../public/redux/action/category'

class ModalUpdateCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            category_name: this.props.data.category_name,
            visibleAlert : false,
            error : "",
            alertColor : 'danger',
        }
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

    handleButton = () => {
        this.setState({
            isOpen: false
        })
    }

    handleCategoryName=(e)=>{
        this.setState({
            category_name : e.target.value
        })
    }

    handleUpdateCategory=(e)=>{
        this.setState({
            isOpen: false
        })
        const dataCategory ={
            category_name : this.state.category_name
        }

        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }

        if(dataCategory.category_name == ''){
            this.setState({
                visibleAlert : true,
                error : "Data Tidak Boleh Kosong",
                alertColor : 'danger',
            })
        }else{
        axios.put(`http://127.0.0.1:3001/category/${this.props.category_id}`,dataCategory,headers)
                .then(res => {
                    if (res.status === 200) {
                        try {
                            this.props.dispatch(requestCategory(headers))
                        } catch (error) {
                            console.log(error)
                        }
                    }else if(res.status === 400){
                        this.setState({
                            error : res.data.data.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Alert color={this.state.alertColor} isOpen={this.state.visibleAlert} toggle={this.onDismissAlert}>
                {this.state.error}
                </Alert>
                <Button style={{marginBottom:"10px"}} color="dark" onClick={this.handleClick}>Update</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Update Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Col sm={10}>
                                {/* <Input type="select" name="select" onChange={(e) => { this.handleCategory(e)}}>
                                    {this.props.category.map((data)=>{
                                        return(<option value={data.category_id}>{data.category_name}</option>)
                                    })}
                                </Input> */}
                                <p>Category ID : {this.props.category_id}</p>
                                <p>Category Name : {this.props.category_name}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="category name"
                                    defaultValue={this.props.data.category_name}
                                    onChange={(e) => { this.handleCategoryName(e) }}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { this.handleUpdateCategory(e) }}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.handleButton}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth : state.auth,
        category : state.category,
        products : state.products
    }
}

export default connect(mapStateToProps)(ModalUpdateCategory);