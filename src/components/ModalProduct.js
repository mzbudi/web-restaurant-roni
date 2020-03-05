import React from "react";
import PropTypes from "prop-types";
import "../index.css";
import plus from "../images/plus.png";
import axios from "axios";
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
  FormText
} from "reactstrap";
import style from "../styles";
import { withRouter, Link } from "react-router-dom";

class ModalProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      category_data: [],
      newProduct: {
        category_id: "5"
      },
      error: ""
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

  handleButtonAdd = e => {
    this.setState({
      isOpen: false
    });
    const formData = new FormData();
    formData.append("category_id", this.state.newProduct.category_id);
    formData.append("product_name", this.state.newProduct.product_name);
    formData.append(
      "product_description",
      this.state.newProduct.product_description
    );
    formData.append("product_image", this.state.newProduct.product_image);
    formData.append("product_price", this.state.newProduct.product_price);

    const data = JSON.parse(localStorage.getItem("dataAccount"));
    axios
      .post(`${process.env.REACT_APP_API_HOST}/products`, formData, {
        headers: { authorization: data.token }
      })
      .then(res => {
        if (res.status === 200) {
          try {
            this.forceUpdate();
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
        localStorage.removeItem("dataAccount");
        this.props.history.push("/login");
      });
  };

  handleCategory = e => {
    this.setState({
      newProduct: { ...this.state.newProduct, category_id: e.target.value }
    });
  };

  handleImage = e => {
    this.setState({
      newProduct: { ...this.state.newProduct, product_image: e.target.files[0] }
    });
  };

  handlePrice = e => {
    this.setState({
      newProduct: { ...this.state.newProduct, product_price: e.target.value }
    });
  };

  handleName = e => {
    this.setState({
      newProduct: { ...this.state.newProduct, product_name: e.target.value }
    });
  };

  handleDescription = e => {
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        product_description: e.target.value
      }
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button
          style={style.buttonSidebar}
          color="dark"
          onClick={this.handleClick}
        >
          + Product
        </Button>
        <Modal isOpen={isOpen} toggle={this.handleClick}>
          <ModalHeader toggle={this.handleButton}>Add Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Category
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="select"
                    onChange={e => {
                      this.handleCategory(e);
                    }}
                  >
                    {this.props.category.map(data => {
                      return (
                        <option value={data.category_id}>
                          {data.category_name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="product_name"
                  placeholder="Product Name"
                  onChange={e => {
                    this.handleName(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  onChange={e => {
                    this.handlePrice(e);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Product Description"
                  onChange={e => {
                    this.handleDescription(e);
                  }}
                />
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="file"
                    name="file"
                    onChange={e => {
                      this.handleImage(e);
                    }}
                  />
                  <FormText color="muted">
                    <p>
                      File Harus Ber-Ekstensi Gambar dan Tidak Lebih dari 2 MB
                    </p>
                    <p>{this.state.error}</p>
                  </FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.handleButtonAdd(e);
              }}
            >
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.handleButton}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalProduct);
