import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  ButtonToggle
} from "reactstrap";
import style from "../styles";
import { requestLogin } from "../public/redux/action/auth";
import { requestCategory } from "../public/redux/action/category";
import { requestUsers } from "../public/redux/action/users";
import { connect } from "react-redux";
import logoImage from "../images/logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      visibleAlert: false,
      error: "",
      isLoading: false
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("persist:root"));
    if (data.auth.data) {
      this.props.history.push("/");
    }
  }

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleRegister = e => {
    this.props.history.push("/register");
  };

  handleLogin = async e => {
    e.preventDefault();
    const { auth } = this.props;
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    if (data.username === "" && data.password === "") {
      this.setState({
        visibleAlert: true,
        error: "Username dan Password Tidak Boleh Kosong!",
        isLoading: false
      });
    } else {
      this.props
        .dispatch(requestLogin(data))
        .then(res => {
          const headers = { authorization: res.value.token };
          const configCategory = {
            headers
          };
          if (data.user_role === "1") {
            this.props.dispatch(requestUsers(configCategory));
          }
          this.props.dispatch(requestCategory(configCategory));
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({
            visibleAlert: true,
            error: auth.message,
            isLoading: false
          });
          console.log(err);
        });
    }
  };

  onDismissAlert = () => {
    this.setState({
      visibleAlert: !this.state.visibleAlert
    });
  };
  render() {
    return (
      <div style={{ backgroundColor: "blue" }}>
        <Alert
          color="danger"
          isOpen={this.state.visibleAlert}
          toggle={this.onDismissAlert}
        >
          {this.state.error}
        </Alert>
        <div style={style.formMaker}>
          <center>
            <img
              alt=""
              src={logoImage}
              height={150}
              style={{ marginBottom: "16px" }}
            />
          </center>
          <Form>
            <FormGroup>
              <Input
                style={style.inputLogin}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={e => {
                  this.handleUsername(e);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="Password"
                onChange={e => {
                  this.handlePassword(e);
                }}
              />
            </FormGroup>
            <div>
              {this.props.auth.isLoading ? (
                <div style={style.spinnerDiv}>
                  <Row>
                    <Col md="5"></Col>
                    <Col md="4">
                      <Spinner color="primary" size="lg" />
                    </Col>
                    <Col md="4"></Col>
                  </Row>
                </div>
              ) : (
                <ButtonToggle
                  style={style.buttonLogin}
                  onClick={e => {
                    this.handleLogin(e);
                  }}
                  color="secondary"
                  block
                >
                  Login
                </ButtonToggle>
              )}
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category
  };
};

export default connect(mapStateToProps)(Login);
