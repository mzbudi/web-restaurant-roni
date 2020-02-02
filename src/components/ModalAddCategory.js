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
    Input, Col, FormText
} from 'reactstrap';
import style from '../styles';
import axios from 'axios';
import {connect} from 'react-redux'
import {requestCategory} from '../public/redux/action/category'

class ModalAddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            category_name : ''
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

    handleCategoryName=(e)=>{
        this.setState({
            category_name : e.target.value
        })
    }
    
    handleSubmitCategory=(e)=>{
        this.setState({
            isOpen: false
        })
        const dataCategory ={
            category_name : this.state.category_name
        }
        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }
        // const data = JSON.parse(localStorage.getItem('dataAccount'))
        axios.post('http://127.0.0.1:3001/category',dataCategory,headers)
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
                    // this.props.history.push('/login');
                    console.log(err)
                })
    }

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Button style={style.buttonAddProduct} color="dark" onClick={this.handleClick}>+ Category</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Add Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="product_name"
                                    placeholder="Category Name"
                                    onChange={(e) => { this.handleCategoryName(e) }}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { this.handleSubmitCategory(e) }}>Submit</Button>{' '}
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
        category: state.category
    }
}

export default connect(mapStateToProps)(ModalAddCategory);