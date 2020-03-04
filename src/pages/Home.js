import React, { Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
  Row,
  Col,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import style from "../styles.js";
import CardProduct from "../components/CardProduct";
import { connect } from "react-redux";
import { requestProducts } from "../public/redux/action/products";
import { requestLogout } from "../public/redux/action/auth";
import { requestCategory } from "../public/redux/action/category";
import { addCart } from "../public/redux/action/cart";
import Cart from "../components/Cart";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      dataProduct: [],
      dataTotal: [],
      searchData: "",
      category_data: [],
      cart: [],
      orders: [],
      grandTotal: 0,
      modalCheckoutOpen: false,
      invoice: "",
      sorter: "",
      pages: [],
      nameSearch: "",
      category_id: "",
      limit: "5",
      page: 0,
      product_name: "",
      date: ""
    };
  }

  componentDidMount() {
    if (this.props.auth.data.length === 0) {
      this.props.history.push("/login");
    } else {
      const headers = { authorization: this.props.auth.data.data.data.token };
      const configCategory = {
        headers
      };
      const config = {
        headers,
        params: {
          nameSearch: "",
          category_id: "",
          limit: "5",
          page: 0,
          product_name: "",
          date: ""
        }
      };
      this.props.dispatch(requestProducts(config)).then(res => {
        const page = Math.ceil(
          parseInt(this.props.products.dataProducts.data.data.totalData) / 5
        );
        const pages = [];
        for (let i = 0; i <= page; i++) {
          if (i !== page) {
            pages.push(i);
          }
        }
        this.setState({
          pages: pages
        });
      });
      this.props.dispatch(requestCategory(configCategory));
    }
  }

  handleButton = e => {
    this.setState({
      modalCheckoutOpen: !this.state.modalCheckoutOpen
    });
  };

  searchByCategory = e => {
    this.setState(
      {
        nameSearch: "",
        category_id: e.target.value,
        limit: "5",
        page: 0,
        product_name: "",
        date: ""
      },
      () => {
        const headers = { authorization: this.props.auth.data.data.data.token };
        const config = {
          headers,
          params: {
            nameSearch: this.state.nameSearch,
            category_id: this.state.category_id,
            limit: "5",
            page: 0,
            product_name: this.state.product_name,
            date: this.state.date
          }
        };
        this.props.dispatch(requestProducts(config)).then(res => {
          const page = Math.ceil(
            parseInt(this.props.products.dataProducts.data.data.totalData) / 5
          );
          const pages = [];
          for (let i = 0; i <= page; i++) {
            if (i !== page) {
              pages.push(i);
            }
          }
          this.setState({
            pages: pages
          });
        });
      }
    );
  };

  sortByName = e => {
    this.setState(
      {
        nameSearch: "",
        category_id: "",
        limit: "5",
        page: 0,
        product_name: "product_name",
        date: ""
      },
      () => {
        const headers = { authorization: this.props.auth.data.data.data.token };
        const config = {
          headers,
          params: {
            nameSearch: this.state.nameSearch,
            category_id: this.state.category_id,
            limit: "5",
            page: 0,
            product_name: this.state.product_name,
            date: this.state.date
          }
        };
        this.props.dispatch(requestProducts(config)).then(res => {
          const page = Math.ceil(
            parseInt(this.props.products.dataProducts.data.data.totalData) / 5
          );
          const pages = [];
          for (let i = 0; i <= page; i++) {
            if (i !== page) {
              pages.push(i);
            }
          }
          this.setState({
            pages: pages
          });
        });
      }
    );
  };

  sortByDate = e => {
    this.setState(
      {
        nameSearch: "",
        category_id: "",
        limit: "5",
        page: 0,
        product_name: "",
        date: "updated_at"
      },
      () => {
        const headers = { authorization: this.props.auth.data.data.data.token };
        const config = {
          headers,
          params: {
            nameSearch: this.state.nameSearch,
            category_id: this.state.category_id,
            limit: "5",
            page: 0,
            product_name: this.state.product_name,
            date: this.state.date
          }
        };
        this.props.dispatch(requestProducts(config)).then(res => {
          const page = Math.ceil(
            parseInt(this.props.products.dataProducts.data.data.totalData) / 5
          );
          const pages = [];
          for (let i = 0; i <= page; i++) {
            if (i !== page) {
              pages.push(i);
            }
          }
          this.setState({
            pages: pages
          });
        });
      }
    );
  };

  handleSearchProduct = e => {
    e.preventDefault();
    this.setState(
      {
        nameSearch: e.target.value,
        category_id: "",
        limit: "5",
        page: 0,
        product_name: "",
        date: ""
      },
      () => {
        const headers = { authorization: this.props.auth.data.data.data.token };
        const config = {
          headers,
          params: {
            nameSearch: this.state.nameSearch,
            category_id: this.state.category_id,
            limit: "5",
            page: 0,
            product_name: this.state.product_name,
            date: this.state.date
          }
        };
        this.props.dispatch(requestProducts(config)).then(res => {
          const page = Math.ceil(
            parseInt(this.props.products.dataProducts.data.data.totalData) / 5
          );
          const pages = [];
          for (let i = 0; i <= page; i++) {
            if (i !== page) {
              pages.push(i);
            }
          }
          this.setState({
            pages: pages
          });
        });
      }
    );
  };

  paginationClick = e => {
    const headers = { authorization: this.props.auth.data.data.data.token };
    const config = {
      headers,
      params: {
        nameSearch: this.state.nameSearch,
        category_id: this.state.category_id,
        limit: "5",
        page: e.target.value,
        product_name: this.state.product_name,
        date: this.state.date
      }
    };
    this.props.dispatch(requestProducts(config));
  };

  handleLogout = e => {
    e.preventDefault();
    try {
      localStorage.removeItem("dataAccount");
      this.props.history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { products } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.state.modalCheckoutOpen}
          toggle={e => {
            this.handleButton(e);
          }}
        >
          <ModalHeader
            toggle={e => {
              this.handleButton(e);
            }}
          >
            Detail Product
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <p>Pesanan Sudah Di Input</p>
                <p>Nomer Invoice : {this.state.invoice}</p>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.handleButton(e);
              }}
            >
              Submit
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Navbar color="dark" dark expand="md" style={{ marginBottom: "10px" }}>
          <NavbarBrand href="/">Luwe</NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ color: "white" }}>
                  Sort
                </DropdownToggle>
                <DropdownMenu direction="right">
                  <DropdownItem
                    onClick={e => {
                      this.sortByName(e);
                    }}
                  >
                    Sort by Name
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={e => {
                      this.sortByDate(e);
                    }}
                  >
                    Sort by Newest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ color: "white" }}>
                  Category
                </DropdownToggle>
                <DropdownMenu direction="right">
                  {this.props.category.isLoading
                    ? this.props.category.dataCategory.data.data.map(
                        (data, i) => {
                          return (
                            <Fragment>
                              <DropdownItem
                                value={data.category_id}
                                onClick={e => {
                                  this.searchByCategory(e);
                                }}
                              >
                                {data.category_name}
                              </DropdownItem>
                              <DropdownItem divider />
                            </Fragment>
                          );
                        }
                      )
                    : ""}
                </DropdownMenu>
              </UncontrolledDropdown>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                onChange={e => {
                  this.handleSearchProduct(e);
                }}
              />
            </Nav>
            <NavbarText style={{ color: "white" }}>
              {this.props.auth.data.length === 0
                ? this.props.history.push("/login")
                : this.props.auth.data.data.data.name}
            </NavbarText>
            <Nav>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ color: "white" }}>
                  Others
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/">
                    <DropdownItem style={style.buttonNavbar}>Home</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  {this.props.auth.data.length === 0 ? (
                    this.props.history.push("/login")
                  ) : this.props.auth.data.data.data.user_role === "1" ? (
                    <React.Fragment>
                      <Link to="/order">
                        <DropdownItem style={style.buttonNavbar}>
                          History Order
                        </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                      <Link to="/products">
                        <DropdownItem style={style.buttonNavbar}>
                          Products
                        </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                      <Link to="/category">
                        <DropdownItem style={style.buttonNavbar}>
                          Category
                        </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                      <Link to="/users">
                        <DropdownItem style={style.buttonNavbar}>
                          Cashier
                        </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                  <DropdownItem>
                    <NavLink
                      onClick={e => {
                        this.props.dispatch(requestLogout());
                      }}
                    >
                      Logout
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        {/* Navbar Ends Here */}
        <Container>
          <Row>
            <Col>
              <Row>
                {this.props.products.isLoading
                  ? this.props.products.dataProducts.data.data.searchResult.map(
                      (data, i) => {
                        const product_image =
                          "http://localhost:3001/" +
                          data.product_image.replace("assets", "");
                        // const item = data;
                        if (i < 3) {
                          return (
                            <Col md="4" style={style.columnCardPict}>
                              <CardProduct
                                _key={i}
                                data={data}
                                product_image={product_image}
                              />
                            </Col>
                          );
                        }
                      }
                    )
                  : ""}
              </Row>
              <Row>
                {this.props.products.isLoading
                  ? this.props.products.dataProducts.data.data.searchResult.map(
                      (data, i) => {
                        const product_image =
                          "http://localhost:3001/" +
                          data.product_image.replace("assets", "");
                        if (i >= 3) {
                          return (
                            <Col md="4" style={style.columnCardPict}>
                              <CardProduct
                                _key={i}
                                data={data}
                                product_image={product_image}
                              />
                            </Col>
                          );
                        }
                      }
                    )
                  : ""}
              </Row>
            </Col>
            <Col xs="4" style={{ padding: "0" }}>
              <Cart />
            </Col>
          </Row>
          <Pagination size="sm">
            {this.state.pages.map((page, i) => {
              if (products.dataProducts.data.data.activePage === page + 1) {
                return (
                  <PaginationItem active>
                    <PaginationLink
                      value={page}
                      onClick={e => {
                        this.paginationClick(e);
                      }}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem>
                    <PaginationLink
                      value={page}
                      onClick={e => {
                        this.paginationClick(e);
                      }}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            })}
          </Pagination>
        </Container>
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

export default connect(mapStateToProps)(Home);
