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

class ModalDetailProduct extends React.Component {
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
                <Button color="dark" onClick={this.handleClick}>Detail</Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                    <ModalHeader toggle={this.handleButton}>Detail Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
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

export default ModalDetailProduct;