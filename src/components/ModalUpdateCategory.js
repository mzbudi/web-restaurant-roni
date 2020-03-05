import React, { Component, Fragment } from "react";
import "../index.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Alert,
  Table
} from "reactstrap";
import style from "../styles";
import axios from "axios";
import { connect } from "react-redux";
import { requestCategory } from "../public/redux/action/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

class ModalUpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      category_name: this.props.data.category_name,
      errorAlert: false,
      successAlert: false,
      message: "",
      error: "",
      alertColor: "danger"
    };
  }

  handleClick = () => {
    this.setState({
      isOpen: true
    });
  };

  onDismissAlert = () => {
    this.setState({
      errorAlert: false,
      successAlert: false
    });
  };

  handleButton = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCategoryName = e => {
    this.setState({
      category_name: e.target.value
    });
  };

  handleUpdateCategory = e => {
    const { auth } = this.props;
    const dataCategory = {
      category_name: this.state.category_name
    };

    const headers = {
      headers: { authorization: auth.data.token }
    };

    if (dataCategory.category_name === "") {
      this.setState({
        errorAlert: true,
        message: "Data Tidak Boleh Kosong"
      });
    } else {
      axios
        .put(
          `http://127.0.0.1:3001/category/${this.props.category_id}`,
          dataCategory,
          headers
        )
        .then(res => {
          console.log(res);
          try {
            this.setState({
              message: "Data Updated",
              successAlert: true,
              isOpen: false
            });
            this.props.dispatch(requestCategory(headers));
          } catch (error) {
            console.log(error);
          }
        })
        .catch(err => {
          this.setState({
            errorAlert: true,
            message: "Data Tidak Boleh Kosong"
          });
        });
    }
  };

  render() {
    const { isOpen, message, successAlert, errorAlert } = this.state;
    const { category_id, category_name } = this.props;
    return (
      <Fragment>
        <Alert
          style={{ position: "fixed", zIndex: 2, bottom: "50px", left: "50px" }}
          color="success"
          isOpen={successAlert}
          toggle={this.onDismissAlert}
        >
          {message}
        </Alert>
        <Button
          style={{ marginRight: 10 }}
          color="dark"
          onClick={this.handleClick}
        >
          <FontAwesomeIcon icon={faPenSquare} /> Update
        </Button>
        <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
          <ModalHeader toggle={this.handleButton}>Update Category</ModalHeader>
          <ModalBody>
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
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="category name"
                  defaultValue={this.props.data.category_name}
                  onChange={e => {
                    this.handleCategoryName(e);
                  }}
                />
                <p style={{ fontSize: 12 }}>
                  Once You Press Submit Button, Data Will be Updated
                </p>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.handleUpdateCategory(e);
              }}
            >
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.handleButton}>
              Cancel
            </Button>
          </ModalFooter>
          <Alert
            style={{
              position: "absolute",
              zIndex: 2,
              alignSelf: "center",
              marginTop: 20
            }}
            color="danger"
            isOpen={errorAlert}
            toggle={this.onDismissAlert}
          >
            {message}
          </Alert>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    category: state.category,
    products: state.products
  };
};

export default connect(mapStateToProps)(ModalUpdateCategory);
