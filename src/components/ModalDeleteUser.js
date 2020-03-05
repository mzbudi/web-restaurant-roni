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
  Col
} from "reactstrap";
import style from "../styles";
import axios from "axios";
import { connect } from "react-redux";
import { requestUsers } from "../public/redux/action/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class ModalDeleteCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
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

  handleDeleteUser = e => {
    const { auth } = this.props;
    this.setState({
      isOpen: false
    });
    const headers = {
      headers: { authorization: auth.data.token }
    };
    axios
      .delete(
        `${process.env.REACT_APP_API_HOST}/users/${this.props.user_id}`,
        headers
      )
      .then(res => {
        if (res.status === 200) {
          try {
            this.props.dispatch(requestUsers(headers));
          } catch (error) {
            console.log(error);
          }
        } else if (res.status === 400) {
          this.setState({
            error: res.data.data.message
          });
        }
      })
      .catch(err => {
        // localStorage.removeItem('dataAccount');
        // this.props.history.push('/login')
        console.log(err);
      });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <Button onClick={this.handleClick}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </Button>
        <Modal isOpen={isOpen} toggle={this.handleClick}>
          <ModalHeader toggle={this.handleButton}>Delete User</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  <p>User Id : {this.props.user_id}</p>
                  <p>Name : {this.props.name}</p>
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
            <Button
              color="primary"
              onClick={e => {
                this.handleDeleteUser(e);
              }}
            >
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
    category: state.category,
    users: state.users
  };
};

export default connect(mapStateToProps)(ModalDeleteCategory);
