import React, { Component, Fragment } from "react";
import "../index.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Col,
  Alert
} from "reactstrap";
import style from "../styles";
import axios from "axios";
import { connect } from "react-redux";
import { requestCategory } from "../public/redux/action/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class ModalDeleteCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      alert: false,
      message: ""
    };
  }

  handleClick = () => {
    this.setState({
      isOpen: true
    });
  };

  handleButton = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCategory = e => {
    this.setState({
      category_id: e.target.value
    });
  };

  handleDeleteCategory = e => {
    const { auth } = this.props;
    this.setState({
      isOpen: false
    });
    const headers = {
      headers: { authorization: auth.data.token }
    };
    console.log(headers);
    axios
      .delete(
        `${process.env.REACT_APP_API_HOST}/category/${this.props.category_id}`,
        headers
      )
      .then(res => {
        this.props.dispatch(requestCategory(headers));
        this.setState({
          isOpen: false,
          alert: true,
          message: "Data Deleted"
        });
      })
      .catch(err => {
        this.setState({
          isOpen: false
        });
      });
  };

  render() {
    const { isOpen, message, alert } = this.state;
    const { category_id, category_name } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleClick}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </Button>
        <Alert
          style={{ position: "fixed", zIndex: 2, bottom: "50px", left: "50px" }}
          color={"success"}
          isOpen={alert}
          toggle={this.onDismissAlert}
        >
          {message}
        </Alert>
        <Modal isOpen={isOpen} toggle={this.handleClick}>
          <ModalHeader toggle={this.handleButton}>Delete Category</ModalHeader>
          <ModalBody>
            <p>Are You Sure Want To Delete This Category?</p>
            <Table>
              <tr>
                <th scope="row">Category ID</th>
                <td>{category_id}</td>
              </tr>
              <tr>
                <th scope="row">Category Name</th>
                <td>{category_name}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td></td>
              </tr>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDeleteCategory}>
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.handleButton}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    category: state.category
  };
};

export default connect(mapStateToProps)(ModalDeleteCategory);
