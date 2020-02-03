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
import {requestCategory} from '../public/redux/action/category'

class ModalDeleteCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
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

    handleCategory = (e) => {
        this.setState({
            category_id : e.target.value
        })
    }

    

    handleDeleteCategory=(e)=>{
        this.setState({
            isOpen: false
        })
        const headers = {
            headers : {authorization: this.props.auth.data.data.data.token}
        }
        console.log(headers);
        // const data = JSON.parse(localStorage.getItem('dataAccount'))
        axios.delete(`http://127.0.0.1:3001/category/${this.props.category_id}`,headers)
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
                    // localStorage.removeItem('dataAccount');
                    // this.props.history.push('/login')
                    console.log(err)
                })
    }

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Button onClick={this.handleClick}>Delete</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick}>
                    <ModalHeader toggle={this.handleButton}>Delete Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Col sm={10}>
                                <p>Category ID : {this.props.category_id}</p>
                                <p>Category Name : {this.props.category_name}</p>
                                {/* <Input type="select" name="select" onChange={(e) => { this.handleCategory(e)}}>
                                    {this.props.category.map((data)=>{
                                        return(<option value={data.category_id}>{data.category_name}</option>)
                                    })}
                                </Input> */}
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { this.handleDeleteCategory(e) }}>Submit</Button>{' '}
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
        category : state.category
    }
}

export default connect(mapStateToProps)(ModalDeleteCategory);