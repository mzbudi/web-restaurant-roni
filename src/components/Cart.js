import React from "react";
import style from "../styles.js";
import { Input, Button, ButtonToggle, Table } from "reactstrap";
import cartImage from "../images/cartpict.PNG";
import { connect } from "react-redux";
import {
  removeCart,
  emptyCart,
  incrementCart,
  decrementCart,
  createOrder
} from "../public/redux/action/cart";
import ModalCheckout from "../components/ModalCheckout";
import { formatRupiah } from "../public/helper/parsePrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cart: []
    };
  }

  handleCheckout = e => {
    const { auth } = this.props;
    const body = {
      user_id: auth.data.user_id,
      orders: this.props.cart.cartData
    };

    const headers = {
      headers: { authorization: auth.data.token }
    };

    this.props.dispatch(createOrder(body, headers)).then(res => {
      this.setState(
        {
          isOpen: true,
          cart: this.props.cart.cartData
        },
        () => {
          this.props.dispatch(emptyCart());
        }
      );
    });
  };

  render() {
    return (
      <div style={style.cartDiv}>
        <div>
          {this.props.cart.cartData.length === 0
            ? ""
            : this.props.cart.cartData.map((data, i) => {
                const product_image =
                  `${process.env.REACT_APP_API_HOST}` +
                  data.product_image.replace("assets", "");
                return (
                  <Table responsive>
                    <tr>
                      <td style={style.centerCentered}>
                        <img
                          style={{ borderRadius: 8 }}
                          alt=""
                          src={product_image}
                          height={50}
                          width={50}
                        />
                      </td>
                      <td style={style.centerCentered}>
                        <div style={{ display: "flex" }}>
                          <Button
                            id={data.product_id}
                            disabled={
                              this.props.cart.cartData[i].quantity === 1
                                ? true
                                : false
                            }
                            color="info"
                            onClick={e => {
                              this.props.dispatch(
                                decrementCart(data.product_id)
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </Button>{" "}
                          <Input
                            style={{ width: 45 }}
                            defaultValue={1}
                            value={this.props.cart.cartData[i].quantity}
                          />
                          <Button
                            id={data.product_id}
                            color="info"
                            onClick={e => {
                              this.props.dispatch(
                                incrementCart(data.product_id)
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>{" "}
                        </div>
                      </td>
                      <td style={style.centerCentered}>
                        {formatRupiah(
                          this.props.cart.cartData[i].product_price *
                            this.props.cart.cartData[i].quantity
                        )}
                      </td>
                      <td style={style.closeCartButton}>
                        <Button
                          id={data.product_id}
                          color="danger"
                          onClick={e => {
                            this.props.dispatch(removeCart(data));
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </Button>
                      </td>
                    </tr>
                  </Table>
                );
              })}
        </div>
        {this.props.cart.cartData.length > 0 ? (
          <div>
            <Table>
              <tr>
                <th scope="row">Total</th>
                <th scope="row">PPN</th>
                <th scope="row">Sub Total</th>
              </tr>
              <tr>
                <td>{formatRupiah(this.props.cart.grandTotal, "Rp. ")}</td>
                <td>
                  {formatRupiah(this.props.cart.grandTotal * 0.1, "Rp. ")}
                </td>
                <td>
                  {formatRupiah(
                    this.props.cart.grandTotal +
                      this.props.cart.grandTotal * 0.1,
                    "Rp. "
                  )}
                </td>
              </tr>
            </Table>
            <ModalCheckout />
            <ButtonToggle
              onClick={e => {
                this.props.dispatch(emptyCart());
              }}
              style={style.buttonCheckout}
              color="danger"
            >
              Cancel
            </ButtonToggle>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img height={250} width={250} src={cartImage} alt="Logo"></img>
            <p>Cart is Empty</p>
          </div>
        )}
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

export default connect(mapStateToProps)(Cart);
