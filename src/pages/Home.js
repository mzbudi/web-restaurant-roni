import React from 'react';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
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
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Pagination, PaginationItem, PaginationLink, ButtonToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, Form, FormGroup
} from 'reactstrap';
import {
    withRouter,
    Link
} from 'react-router-dom';
import style from '../styles.js';
import ModalAddCategory from '../components/ModalAddCategory'
import axios from 'axios';
import qs from 'qs';
import ModalDetailProduct from '../components/ModalDetailProduct';
import cartImage from '../images/cartpict.PNG';
import bgImage from '../images/batikbg.jpg';
import { connect } from 'react-redux';
import { requestProducts } from '../public/redux/action/products';
import { requestLogout } from '../public/redux/action/auth';
import { requestCategory } from '../public/redux/action/category';
import { addCart } from '../public/redux/action/cart';
import Cart from '../components/Cart';


class Home extends React.Component {
    constructor(props) {
        super(props)
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
            invoice: '',
            sorter: '',
            pages: [],
            nameSearch: '',
            category_id: '',
            limit: '5',
            page: 0,
            product_name: '',
            date: '',
        }
    }

    componentDidMount() {
        if(this.props.auth.data.length === 0){
            this.props.history.push('/login')
        }else{
            const headers = { authorization: this.props.auth.data.data.data.token }
        const configCategory = {
            headers
        }
        const config = {
            headers,
            params: {
                nameSearch: '',
                category_id: '',
                limit: '5',
                page: 0,
                product_name: '',
                date: '',
            }
        }
        this.props.dispatch(requestProducts(config))
            .then((res) => {
                const page = Math.ceil(parseInt(this.props.products.dataProducts.data.data.totalData) / 5)
                const pages = [];
                for (let i = 0; i <= page; i++) {
                    if (i !== page) { pages.push(i) }
                }
                this.setState({
                    pages: pages
                })
            })
        this.props.dispatch(requestCategory(configCategory));
        } 
        
    }

    handleCancel = (e) => {
        this.setState({
            cart: [],
            orders: [],
            grandTotal: 0,
        })
    }

    handleButton = (e) => {
        this.setState({
            modalCheckoutOpen: !this.state.modalCheckoutOpen
        })
    }

    incrementOrder = (e, product_price) => {
        this.setState({
            orders: this.state.orders.map((order) =>
                (order.product_id == e.target.id ?
                    {
                        ...order, quantity: order.quantity + 1,
                        totalPrice: product_price * (order.quantity + 1)
                    }
                    :
                    order)),
            grandTotal: this.state.grandTotal + parseInt(product_price)
        })
    }

    handleCheckout = (e) => {

        const body = {
            user_id: this.props.auth.data.data.data.user_id,
            orders: this.state.orders
        }

        axios.post('http://127.0.0.1:3001/order/', body, {
            headers: { authorization: this.props.auth.data.data.data.token }
        })
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            cart: [],
                            orders: [],
                            grandTotal: 0,
                            modalCheckoutOpen: true,
                            invoice: res.data.data.invoice
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }).catch(err => {
                localStorage.removeItem('dataAccount');
                this.props.history.push('/login')
            })

    }

    decrementOrder = (e, product_price) => {
        this.setState({
            orders: this.state.orders.map((order) => (order.product_id == e.target.id ? { ...order, quantity: order.quantity - 1, totalPrice: product_price * (order.quantity - 1) } : order)),
            grandTotal: this.state.grandTotal - parseInt(product_price)
        })
    }

    deleteFromCart = (e) => {
        var totalPrice = 0
        this.state.orders.map((order, i) => {
            if (order.product_id == e.target.id) {
                totalPrice = order.totalPrice
            }
        })
        let cartForDelete = this.state.cart.filter((data) => { return data.product_id != e.target.id })
        let ordersForDelete = this.state.orders.filter((data) => { return data.product_id != e.target.id })
        this.setState({
            cart: cartForDelete,
            orders: ordersForDelete,
            grandTotal: this.state.grandTotal - parseInt(totalPrice)
        })
    }


    addOrderButton = (e, item) => {
        let arrExist = [];
        // console.log(item)
        this.props.dispatch(addCart(item))
        // if (this.state.cart.length === 0) {
        //     this.setState({
        //         cart: [...this.state.cart, item],
        //         orders: [...this.state.orders, {
        //             product_id: item.product_id,
        //             product_price: item.product_price,
        //             quantity: 1,
        //             totalPrice: 1 * item.product_price
        //         }],
        //         grandTotal: this.state.grandTotal + parseInt(item.product_price)
        //     })
        // } else {
        //     this.state.cart.map((data, i) => {
        //         if (data.product_id === item.product_id) {
        //             arrExist.push('1')
        //         }
        //     })
        //     if (arrExist.length === 0) {
        //         this.setState({
        //             cart: [...this.state.cart, item],
        //             orders: [...this.state.orders, {
        //                 product_id: item.product_id,
        //                 product_price: item.product_price,
        //                 quantity: 1,
        //                 totalPrice: 1 * item.product_price
        //             }],
        //             grandTotal: this.state.grandTotal + parseInt(item.product_price)
        //         })
        //     }
        // }
    }

    searchByCategory = (e) => {
        this.setState({
            nameSearch: '',
            category_id: e.target.value,
            limit: '5',
            page: 0,
            product_name: '',
            date: '',
        }, () => {
            const headers = { authorization: this.props.auth.data.data.data.token }
            const config = {
                headers,
                params: {
                    nameSearch: this.state.nameSearch,
                    category_id: this.state.category_id,
                    limit: '5',
                    page: 0,
                    product_name: this.state.product_name,
                    date: this.state.date,
                }
            }
            this.props.dispatch(requestProducts(config)).then((res) => {
                const page = Math.ceil(parseInt(this.props.products.dataProducts.data.data.totalData) / 5)
                const pages = [];
                for (let i = 0; i <= page; i++) {
                    if (i !== page) { pages.push(i) }
                }
                this.setState({
                    pages: pages
                })
            })
        });

    }


    sortByName = (e) => {
        this.setState({
            nameSearch: '',
            category_id: '',
            limit: '5',
            page: 0,
            product_name: 'product_name',
            date: '',
        }, () => {
            const headers = { authorization: this.props.auth.data.data.data.token }
            const config = {
                headers,
                params: {
                    nameSearch: this.state.nameSearch,
                    category_id: this.state.category_id,
                    limit: '5',
                    page: 0,
                    product_name: this.state.product_name,
                    date: this.state.date,
                }
            }
            this.props.dispatch(requestProducts(config)).then((res) => {
                const page = Math.ceil(parseInt(this.props.products.dataProducts.data.data.totalData) / 5)
                const pages = [];
                for (let i = 0; i <= page; i++) {
                    if (i !== page) { pages.push(i) }
                }
                this.setState({
                    pages: pages
                })
            })
        });
    }

    sortByDate = (e) => {
        this.setState({
            nameSearch: '',
            category_id: '',
            limit: '5',
            page: 0,
            product_name: '',
            date: 'updated_at',
        }, () => {
            const headers = { authorization: this.props.auth.data.data.data.token }
            const config = {
                headers,
                params: {
                    nameSearch: this.state.nameSearch,
                    category_id: this.state.category_id,
                    limit: '5',
                    page: 0,
                    product_name: this.state.product_name,
                    date: this.state.date,
                }
            }
            this.props.dispatch(requestProducts(config)).then((res) => {
                const page = Math.ceil(parseInt(this.props.products.dataProducts.data.data.totalData) / 5)
                const pages = [];
                for (let i = 0; i <= page; i++) {
                    if (i !== page) { pages.push(i) }
                }
                this.setState({
                    pages: pages
                })
            })
        });
    }

    handleSearchProduct = (e) => {
        e.preventDefault();
        this.setState({
            nameSearch: e.target.value,
            category_id: '',
            limit: '5',
            page: 0,
            product_name: '',
            date: '',
        }, () => {

            const headers = { authorization: this.props.auth.data.data.data.token }
            const config = {
                headers,
                params: {
                    nameSearch: this.state.nameSearch,
                    category_id: this.state.category_id,
                    limit: '5',
                    page: 0,
                    product_name: this.state.product_name,
                    date: this.state.date,
                }
            }
            this.props.dispatch(requestProducts(config)).then((res) => {
                const page = Math.ceil(parseInt(this.props.products.dataProducts.data.data.totalData) / 5)
                const pages = [];
                for (let i = 0; i <= page; i++) {
                    if (i !== page) { pages.push(i) }
                }
                this.setState({
                    pages: pages
                })
            })
        })
    }

    paginationClick = (e) => {
        const headers = { authorization: this.props.auth.data.data.data.token }
        const config = {
            headers,
            params: {
                nameSearch: this.state.nameSearch,
                category_id: this.state.category_id,
                limit: '5',
                page: e.target.value,
                product_name: this.state.product_name,
                date: this.state.date,
            }
        }
        this.props.dispatch(requestProducts(config))
    }

    handleLogout = (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('dataAccount');
            this.props.history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    formatRupiah = (angka, prefix) => {
        let number_string = angka.toString().replace(/[^,\d]/g, '');
        let split = number_string.split(',');
        let remains = split[0].length % 3;
        let rupiah = split[0].substr(0, remains);
        let thausand = split[0].substr(remains).match(/\d{3}/gi);

        if (thausand) {
            let separator = remains ? '.' : '';
            rupiah += separator + thausand.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const { data, isOpen, dataProduct, dataTotal, searchData, category_data, cart, orders, pages } = this.state
        return (
            <div>
                <Modal isOpen={this.state.modalCheckoutOpen} toggle={(e) => { this.handleButton(e) }}>
                    <ModalHeader toggle={(e) => { this.handleButton(e) }}>Detail Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <p>Pesanan Sudah Di Input</p>
                                <p>Nomer Invoice : {this.state.invoice}</p>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { this.handleButton(e) }}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>
                <Navbar color="dark" dark expand="md" style={{ marginBottom: "10px" }}>
                    <NavbarBrand href="/">Restaurant Roni</NavbarBrand>
                    <NavbarToggler onClick={this.handleToggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "white" }}>
                                    Sort
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={(e) => { this.sortByName(e) }}>
                                        Sort by Name
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={(e) => { this.sortByDate(e) }}>
                                        Sort by Newest
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "white" }}>
                                    Search by Category
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.props.category.isLoading ? (this.props.category.dataCategory.data.data.map((data, i) => {
                                        return (
                                            <DropdownItem value={data.category_id} onClick={(e) => { this.searchByCategory(e) }}>
                                                {data.category_name}
                                            </DropdownItem>
                                        )
                                    })) : ''}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search..."
                                onChange={(e) => {
                                    this.handleSearchProduct(e);
                                }}
                            />
                        </Nav>
                        <NavbarText style={{ color: "white" }}>{this.props.auth.data.length === 0 ? this.props.history.push('/login') : ''}</NavbarText>
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
                                    {this.props.auth.data.length === 0 ? this.props.history.push('/login') : (
                                        this.props.auth.data.data.data.user_role === '1' ? (
                                            <React.Fragment>
                                                <Link to="/order">
                                            <DropdownItem style={style.buttonNavbar}>History Order</DropdownItem>
                                        </Link>
                                        <DropdownItem divider />
                                                <Link to="/products">
                                                    <DropdownItem style={style.buttonNavbar}>Products</DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <Link to="/category">
                                                    <DropdownItem style={style.buttonNavbar}> Category</DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <Link to="/users">
                                                    <DropdownItem style={style.buttonNavbar}>Cashier</DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                            </React.Fragment>
                                        ) : ''
                                    )}
                                    {/* {this.props.auth.data.data.data.user_role === '1' ? (
                                        <React.Fragment>
                                            <Link to="/order">
                                        <DropdownItem style={style.buttonNavbar}>History Order</DropdownItem>
                                    </Link>
                                    <DropdownItem divider />
                                            <Link to="/products">
                                                <DropdownItem style={style.buttonNavbar}>Products</DropdownItem>
                                            </Link>
                                            <DropdownItem divider />
                                            <Link to="/category">
                                                <DropdownItem style={style.buttonNavbar}> Category</DropdownItem>
                                            </Link>
                                            <DropdownItem divider />
                                            <Link to="/users">
                                                <DropdownItem style={style.buttonNavbar}>Cashier</DropdownItem>
                                            </Link>
                                            <DropdownItem divider />
                                        </React.Fragment>
                                    ) : ''} */}
                                    <DropdownItem>
                                        <NavLink onClick={(e) => { this.props.dispatch(requestLogout()) }}>Logout</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                {this.props.products.isLoading ? (this.props.products.dataProducts.data.data.searchResult.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                                    const item = data;
                                    if (i < 3) {
                                        return (
                                            <Col md="4" style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width={208} height={138} src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <CardSubtitle>Rp.{this.formatRupiah(data.product_price)}</CardSubtitle>
                                                        <div style={{ display: "inline-flex" }}>
                                                            <Button style={{ marginRight: "5px" }} onClick={(e) => {
                                                                this.props.dispatch(addCart(item))
                                                            }}>Add</Button>
                                                            <ModalDetailProduct product_id={data.product_id} data={data} />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })) : ''}
                            </Row>
                            <Row>
                                {this.props.products.isLoading ? (this.props.products.dataProducts.data.data.searchResult.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                                    const item = data;
                                    if (i >= 3) {
                                        return (
                                            <Col md="4" style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width={208} height={138} src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <CardSubtitle>Rp.{this.formatRupiah(data.product_price)}</CardSubtitle>
                                                        <div style={{ display: "inline-flex" }}>
                                                            <Button style={{ marginRight: "5px" }} onClick={(e) => {
                                                                this.addOrderButton(e, item)
                                                            }}>Add</Button>
                                                            <ModalDetailProduct product_id={data.product_id} data={data} />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })) : ''}
                            </Row>
                        </Col>
                        <Col xs="4" style={{ padding: "0" }}>
                            {/* <div style={style.cartDiv}>
                                <div>
                                    {cart.map((data, i) => {
                                        const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                                        // this.handleTotal(totalPerProduct,data.product_id);
                                        return (
                                            <div style={{ display: "flex" }}>
                                                <div style={style.cartItem}>
                                                    <img alt="" src={product_image} height={80} width={80} />
                                                </div>
                                                <div style={style.incrementCart}>
                                                    <div style={{ display: "flex" }}>
                                                        <Button id={data.product_id} disabled={orders[i].quantity == 1 ? true : false} color="info" onClick={(e) => { this.decrementOrder(e, data.product_price) }}>-</Button>{' '}
                                                        <Input type="number" defaultValue={1} value={orders[i].quantity} />
                                                        <Button id={data.product_id} color="info" onClick={(e) => { this.incrementOrder(e, data.product_price) }}>+</Button>{' '}
                                                    </div>
                                                </div>
                                                <div>Rp. {this.formatRupiah(orders[i].product_price * orders[i].quantity)}</div>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <Button id={data.product_id} color="danger" onClick={(e) => { this.deleteFromCart(e) }}>x</Button>{' '}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {this.state.orders.length > 0 ? (<div>
                                    <p>Sub Total : Rp. {this.formatRupiah(this.state.grandTotal)}</p>
                                    <p>PPN : Rp. {this.formatRupiah(this.state.grandTotal * 0.10)}</p>
                                    <p>Total : Rp. {this.formatRupiah((this.state.grandTotal + (this.state.grandTotal * 0.10)))}</p>
                                    <ButtonToggle style={style.buttonCheckout} onClick={(e) => { this.handleCheckout(e) }} color="info">Checkout</ButtonToggle>
                                    <ButtonToggle onClick={(e) => { this.handleCancel(e) }} style={style.buttonCheckout} color="danger">Cancel</ButtonToggle></div>) : (<div style={{ textAlign: "center" }}><img height={250} width={250} src={cartImage} alt="Logo"></img><p>Cart is Empty</p></div>)}
                            </div> */}
                            <Cart />
                        </Col>
                    </Row>
                    <Pagination size="sm">
                        {this.state.pages.map((page, i) => {
                            return (
                                <PaginationItem >
                                    <PaginationLink value={page} onClick={(e) => { this.paginationClick(e) }}>
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })
                        }
                    </Pagination>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        products: state.products,
        category: state.category,
        cart: state.cart,
    }
}

export default connect(mapStateToProps)(Home);

Home.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
