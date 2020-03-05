import React from "react";
import "../index.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";
import style from "../styles";
import { emptyCart, createOrder } from "../public/redux/action/cart";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { formatRupiah } from "../public/helper/parsePrice";

class ModalCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cart: [],
      invoice: "",
      grandTotal: 0,
      alertVisible: false,
      message: "",
      alertColor: ""
    };
  }

  handleClick = () => {
    this.props.dispatch(emptyCart());
  };

  handleSubmit = () => {
    this.props.dispatch(emptyCart());
  };

  onDismissAlert = () => {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  };

  handleCheckout = e => {
    const { auth } = this.props;
    this.setState({
      isOpen: true
    });
    const body = {
      user_id: auth.data.user_id,
      orders: this.props.cart.cartData
    };

    const headers = {
      headers: { authorization: auth.data.token }
    };

    this.props
      .dispatch(createOrder(body, headers))
      .then(res => {
        this.setState({
          isOpen: true,
          cart: this.props.cart.cartData,
          grandTotal: this.props.cart.grandTotal,
          invoice: res.value.data.data.invoice,
          message: res.value.data.data.message,
          alertColor: "success"
        });
      })
      .catch(err => {
        this.setState({
          message: err.response.data.data.message,
          alertColor: "danger",
          alertVisible: true
        });
      });
  };

  render() {
    const { isOpen, alertVisible, alertColor, message } = this.state;
    return (
      <div>
        <Button
          style={style.buttonCheckout}
          color="dark"
          onClick={e => {
            this.handleCheckout(e);
          }}
        >
          <FontAwesomeIcon color="white" icon={faMoneyBillAlt} /> Checkout
        </Button>
        <Modal isOpen={isOpen} toggle={this.handleClick}>
          <ModalHeader>
            Detail Transaksi Invoice : {this.state.invoice}{" "}
          </ModalHeader>
          <ModalBody>
            <Table light>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cart.map((data, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{data.product_name}</td>
                      <td>{data.quantity}</td>
                      <td>{data.totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Table>
              <tr>
                <th scope="row" style={style.alignRight}>
                  <p>Total </p>
                </th>
                <td style={style.alignRight}>
                  <p>{formatRupiah(this.state.grandTotal, "Rp. ")}</p>
                </td>
              </tr>
              <tr>
                <th scope="row" style={style.alignRight}>
                  <p>PPN </p>
                </th>
                <td style={style.alignRight}>
                  <p>{formatRupiah(this.state.grandTotal * 0.1, "Rp. ")}</p>
                </td>
              </tr>
              <tr>
                <th scope="row" style={style.alignRight}>
                  <p>Sub Total</p>
                </th>
                <td style={style.alignRight}>
                  <p>
                    {formatRupiah(
                      this.state.grandTotal + this.state.grandTotal * 0.1,
                      "Rp. "
                    )}
                  </p>
                </td>
              </tr>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Submit
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(ModalCheckout);
