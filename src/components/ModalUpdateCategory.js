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

class ModalUpdateCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            category_name : '',
            category_id : 5
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
    
    handleCategory = (e) => {
        this.setState({
            category_id : e.target.value
        })
    }

    handleUpdateCategory=(e)=>{
        this.setState({
            isOpen: false
        })
        const dataCategory ={
            category_name : this.state.category_name
        }
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        axios.put(`http://127.0.0.1:3001/category/${this.state.category_id}`,dataCategory,{
            headers: {authorization: data.token}
        })
                .then(res => {
                    if (res.status === 200) {
                        try {
                            this.forceUpdate()
                        } catch (error) {
                            console.log(error)
                        }
                    }else if(res.status === 400){
                        this.setState({
                            error : res.data.data.message
                        })
                    }
                }).catch(err => {
                    localStorage.removeItem('dataAccount');
                    this.props.history.push('/login')
                    // console.log(err)
                })
    }

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Button style={style.buttonSidebar} color="dark" onClick={this.handleClick}>Update Category</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Update Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>Category</Label>
                                <Col sm={10}>
                                <Input type="select" name="select" onChange={(e) => { this.handleCategory(e)}}>
                                    {this.props.category.map((data)=>{
                                        return(<option value={data.category_id}>{data.category_name}</option>)
                                    })}
                                </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="category name"
                                    placeholder="Category Name"
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

export default ModalUpdateCategory;