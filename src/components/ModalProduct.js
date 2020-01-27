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
    Input,
    Col,
    FormText
} from 'reactstrap';
import style from '../styles';

class ModalProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
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

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Button style={style.buttonSidebar} color="dark" onClick={this.handleClick}>Tambah Product</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Add Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="exampleSelect" sm={2}>Category</Label>
                                <Col sm={10}>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="product_name"
                                    placeholder="Product Name"
                                    onChange={(e) => { this.handleUsername(e) }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    onChange={(e) => { this.handlePassword(e) }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="description" id="description" placeholder="Product Description" />
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={10}>
                                    <Input type="file" name="file" id="exampleFile" />
                                    <FormText color="muted">
                                        File Harus Ber-Ekstensi Gambar dan Tidak Lebih dari 2 MB
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleButton}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.handleButton}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ModalProduct;