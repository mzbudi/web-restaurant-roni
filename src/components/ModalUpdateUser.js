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
  Label,
  Input,
  Col,
  Alert
} from "reactstrap";
import style from "../styles";
import axios from "axios";
import { connect } from "react-redux";
import { requestUsers } from "../public/redux/action/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

class ModalUpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      updateOpen: false,
      password: "",
      name: this.props.name,
      role: this.props.user_role,
      warningModal: false,
      messageWarning: "Proses Berhasil",
      visibleAlert: false,
      error: "",
      alertColor: "danger"
    };
  }

  onDismissAlert = () => {
    this.setState({
      visibleAlert: !this.state.visibleAlert
    });
  };

  handleUpdateButton = () => {
    this.setState({
      updateOpen: false
    });

    const headers = {
      headers: { authorization: this.props.auth.data.data.data.token }
    };
    const body = {
      name: this.state.name,
      user_role: "2",
      password: this.state.password
    };

    if (body.name === "" || body.password === "") {
      this.setState({
        visibleAlert: true,
        error: "Data Tidak Boleh Kosong!",
        alertColor: "danger",
        isOpen: false
      });
    } else {
      axios
        .put(`http://127.0.0.1:3001/users/${this.props.user_id}`, body, headers)
        .then(res => {
          if (res.status === 200) {
            try {
              this.setState({
                visibleAlert: true,
                error: "Proses Berhasil",
                alertColor: "success",
                isOpen: false
              });
              this.props.dispatch(requestUsers(headers));
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(err => {
          this.setState({
            visibleAlert: true,
            error: "Terjadi Kesalahan",
            alertColor: "danger",
            isOpen: false
          });
        });
    }
  };

  handleUpdateClick = () => {
    this.setState({
      updateOpen: true
    });
  };

  handleUpdateButtonClick = () => {
    this.setState({
      updateOpen: false
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleName = e => {
    this.setState(
      {
        name: e.target.value
      },
      () => {
        console.log(this.state.name);
      }
    );
  };

  handleUserRole = e => {
    this.setState({
      role: e.target.value
    });
  };

  render() {
    const { updateOpen } = this.state;
    return (
      <React.Fragment>
        <Alert
          color={this.state.alertColor}
          isOpen={this.state.visibleAlert}
          toggle={this.onDismissAlert}
        >
          {this.state.error}
        </Alert>
        <Button
          style={{ marginRight: "10px" }}
          color="dark"
          onClick={e => {
            this.handleUpdateClick(e);
          }}
        >
          <FontAwesomeIcon icon={faPenSquare} /> Update
        </Button>
        <Modal
          isOpen={updateOpen}
          toggle={e => {
            this.handleUpdateClick(e);
          }}
        >
          <ModalHeader
            toggle={e => {
              this.handleUpdateButtonClick(e);
            }}
          >
            Update User
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <p>User Id : {this.props.user_id}</p>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={this.props.data.name}
                  onChange={e => {
                    this.handleName(e);
                  }}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Role
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="select"
                    onChange={e => {
                      this.handleUserRole(e);
                    }}
                  >
                    <option value={"1"}>{"Admin"}</option>
                    <option selected value={"2"}>
                      {"Cashier"}
                    </option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Input
                  style={style.inputRegister}
                  type="password"
                  name="password"
                  id="Password"
                  placeholder="Password"
                  onChange={e => {
                    this.handlePassword(e);
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.handleUpdateButton(e);
              }}
            >
              Submit
            </Button>{" "}
            <Button
              color="secondary"
              onClick={e => {
                this.handleUpdateButtonClick(e);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category,
    users: state.users
  };
};

export default connect(mapStateToProps)(ModalUpdateUser);
