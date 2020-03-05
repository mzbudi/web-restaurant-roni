import React from "react";
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
  Alert
} from "reactstrap";
import style from "../styles";
import axios from "axios";
import { connect } from "react-redux";
import { requestCategory } from "../public/redux/action/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class ModalAddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      category_name: "",
      errorAlert: false,
      successAlert: false,
      message: "",
      alertColor: "danger"
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

  handleCategoryName = e => {
    this.setState({
      category_name: e.target.value
    });
  };

  onDismissAlert = () => {
    this.setState({
      errorAlert: false,
      successAlert: false
    });
  };

  handleSubmitCategory = e => {
    const { auth } = this.props;
    const dataCategory = {
      category_name: this.state.category_name
    };
    const headers = {
      headers: { authorization: auth.data.token }
    };

    axios
      .post("http://127.0.0.1:3001/category", dataCategory, headers)
      .then(res => {
        if (res.status === 200) {
          try {
            this.setState({
              successAlert: true,
              message: res.data.data.message,
              isOpen: false
            });
            this.props.dispatch(requestCategory(headers));
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(err => {
        const { data } = err.response.data;
        this.setState({
          errorAlert: true,
          message: data.message
        });
      });
  };

  render() {
    const { isOpen, errorAlert, successAlert, message } = this.state;
    return (
      <div>
        <Alert
          style={{ position: "fixed", zIndex: 2, bottom: "50px", left: "50px" }}
          color="success"
          isOpen={successAlert}
          toggle={this.onDismissAlert}
        >
          {message}
        </Alert>
        <Button
          style={style.buttonAddProduct}
          color="dark"
          onClick={this.handleClick}
        >
          <FontAwesomeIcon color="white" icon={faPlus} size="sm" /> Category
        </Button>
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
                  onChange={e => {
                    this.handleCategoryName(e);
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.handleSubmitCategory(e);
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    category: state.category
  };
};

export default connect(mapStateToProps)(ModalAddCategory);
