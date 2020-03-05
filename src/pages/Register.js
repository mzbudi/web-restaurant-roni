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
import axios from "axios";
import qs from "qs";
import style from "../styles";
import { requestRegister } from "../public/redux/action/auth";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      visibleAlert: false,
      error: "",
      isLoading: false,
      message: "",
      alertColor: "danger"
    };
  }

  componentDidMount() {
    // const data = JSON.parse(localStorage.getItem('dataAccount'))
    // if(data){
    //     this.props.history.push('/home')
    // }
  }

  handleBackButton = e => {
    this.props.history.push("/login");
  };

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleRegister = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name
    };
    this.setState({
      isLoading: true
    });
    if (data.username === "" || data.password === "" || data.name === "") {
      this.setState({
        visibleAlert: true,
        error: "Data Tidak Boleh Kosong!",
        isLoading: false,
        alertColor: "danger"
      });
    } else {
      this.props
        .dispatch(requestRegister(data))
        .then(res => {
          this.setState({
            error: res.value.data.data.message,
            alertColor: "success",
            visibleAlert: true
          });
        })
        .catch(error => {
          this.setState({
            visibleAlert: true,
            error: "Tidak Ada Koneksi Internet",
            alertColor: "danger"
          });
        })
        .finally(() => {
          this.setState({
            isLoading: false
          });
        });
      //     const body = qs.stringify(data)
      //     axios.post(`${process.env.REACT_APP_API_HOST}/auth/register`,body)
      // .then((res)=>{
      //     if(res.status === 200){
      //         try {
      //             this.setState({error : res.data.data.message, visibleAlert : true});
      //         } catch (error) {
      //             this.setState({
      //                 visibleAlert : true,
      //                 error : "Username Atau Password Salah",
      //             })
      //         }
      //     }
      // })
      // .catch((error)=>{
      //     this.setState({
      //         visibleAlert : true,
      //         error : "Tidak Ada Koneksi Internet",
      //     })
      // })
    }
  };

  onDismissAlert = () => {
    this.setState({
      visibleAlert: !this.state.visibleAlert
    });
  };
  render() {
    return (
      <div>
        <Alert
          color={this.state.alertColor}
          isOpen={this.state.visibleAlert}
          toggle={this.onDismissAlert}
        >
          {this.state.error}
        </Alert>
        <Form style={style.formMaker}>
          <p style={{ textAlign: "center" }}>Restuarant - Roni</p>
          <FormGroup>
            <Input
              style={style.inputRegister}
              type="text"
              name="Name"
              id="Name"
              placeholder="Name"
              onChange={e => {
                this.handleName(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              style={style.inputRegister}
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
          <div>
            {this.state.isLoading ? (
              <Spinner style={style.spinnerLogin} />
            ) : (
              <ButtonToggle
                style={style.buttonRegister}
                onClick={e => {
                  this.handleRegister(e);
                }}
                color="success"
              >
                Register
              </ButtonToggle>
            )}
          </div>
          <div>
            <ButtonToggle
              style={style.buttonRegister}
              onClick={e => {
                this.handleBackButton(e);
              }}
              color="secondary"
            >
              Kembali
            </ButtonToggle>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Register);

Input.propTypes = {
  children: PropTypes.node,
  // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
  invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

//   const style = {
//       formMaker : {
//         position: 'absolute',
//         left: '50%',
//         top: '50%',
//         transform: 'translate(-50%, -50%)',
//         }
//   }
