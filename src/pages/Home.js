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
import cartImage from '../images/icon-keranjang-png-3.png';
import Sidebar from '../components/Sidebar';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            data: [],
            dataProduct: [],
            dataTotal: [],
            searchData: "",
            product_name: '',
            date: '',
            category_data: [],
            cart: [],
            orders: [],
            grandTotal: 0,
            modalCheckoutOpen: false,
            invoice:'',
            sorter:''
        }
        this.handleSearchProduct = this.handleSearchProduct.bind(this)
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        if (!data) {
            this.props.history.push('/login')
        } else {
            axios.get('http://127.0.0.1:3001/products/',{
                headers: {authorization: data.token}
            })
                .then(res => {
                    if (res.status === 200) {
                        try {
                            this.setState({
                                dataProduct: res.data.data.searchResult,
                                dataTotal: res.data.data.totalData,
                            })
                            // console.log(res)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }).catch(err => {
                    localStorage.removeItem('dataAccount');
                    this.props.history.push('/login')
                })
            axios.get('http://127.0.0.1:3001/category',{
                headers: {authorization: data.token}
            })
                .then(res => {
                    if (res.status === 200) {
                        try {
                            this.setState({
                                category_data: res.data.data,
                            })
                            // console.log(res)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }).catch(err => {
                    localStorage.removeItem('dataAccount');
                    this.props.history.push('/login')
                })
        }
        this.setState({
            data: data
        })

    }

    handleCancel = (e) =>{
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
                    { ...order, quantity: order.quantity + 1,
                         totalPrice: product_price * (order.quantity + 1) }
                    :
                    order)),
            grandTotal: this.state.grandTotal + parseInt(product_price)
        })
    }

    handleCheckout = (e) => {
        const data = JSON.parse(localStorage.getItem('dataAccount'))

        const body = {
            user_id: data.user_id,
            orders: this.state.orders
        }

        axios.post('http://127.0.0.1:3001/order/', body,{
            headers: {authorization: data.token}
        })
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            cart: [],
                            orders: [],
                            grandTotal: 0,
                            modalCheckoutOpen: true,
                            invoice : res.data.data.invoice
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
        if (this.state.cart.length === 0) {
            this.setState({
                cart: [...this.state.cart, item],
                orders: [...this.state.orders, {
                    product_id: item.product_id,
                    product_price: item.product_price,
                    quantity: 1,
                    totalPrice: 1 * item.product_price
                }],
                grandTotal: this.state.grandTotal + parseInt(item.product_price)
            })
        } else {
            this.state.cart.map((data, i) => {
                if (data.product_id === item.product_id) {
                    arrExist.push('1')
                }
            })
            if (arrExist.length === 0) {
                this.setState({
                    cart: [...this.state.cart, item],
                    orders: [...this.state.orders, {
                        product_id: item.product_id,
                        product_price: item.product_price,
                        quantity: 1,
                        totalPrice: 1 * item.product_price
                    }],
                    grandTotal: this.state.grandTotal + parseInt(item.product_price)
                })
            }
        }
    }

    searchByCategory = (e) => {
        const data = {
            category_id: e.target.value,
            limit: "5",
            page: 0,
        }
        this.setState({
            category_id: e.target.value,
            product_name : "",
            date : "",
            searchData : "",
        })
        const dataAccount = JSON.parse(localStorage.getItem('dataAccount'))
        const config = {
            headers : {authorization: dataAccount.token},
            params: {
                category_id: data.category_id,
                limit: data.limit,
                page: data.page
            }
        }
        axios.get('http://127.0.0.1:3001/products/',config)
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            dataProduct: res.data.data.searchResult,
                            dataTotal: res.data.data.totalData,
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

    getSortFunction = (e) => {
        const data = {
            limit: "5",
            page: 0,
            date: this.state.date,
            product_name: this.state.product_name,
        }
        const dataAccount = JSON.parse(localStorage.getItem('dataAccount'))
        const config = {
            headers : {authorization: dataAccount.token},
            params: {
                limit: data.limit,
                page: data.page,
                date: data.date,
                product_name: data.product_name
            }
        }
        axios.get('http://127.0.0.1:3001/products/',config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    try {
                        this.setState({
                            dataProduct: res.data.data.searchResult,
                            dataTotal: res.data.data.totalData,
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



    sortByName = (e) => {
        this.setState({
            product_name: 'product_name',
            date: '',
            category_id: e.target.value,
            searchData : "",
        }, () => {
            this.getSortFunction()
        });
    }

    sortByDate = (e) => {
        this.setState({
            date: 'updated_at',
            product_name: '',
            category_id: e.target.value,
            searchData : "",
        }, () => {
            this.getSortFunction()
        });
    }

    handleSearchProduct = (e) => {
        e.preventDefault();
        this.setState({
            searchData: e.target.value
        }, () => { this.getSearchFunction() })
    }

    getSearchFunction = (e) => {
        const data = {
            nameSearch: this.state.searchData,
            limit: "5",
            page: 0,
        }
        const dataAccount = JSON.parse(localStorage.getItem('dataAccount'))
        const config = {
            headers : {authorization: dataAccount.token},
            params: {
                nameSearch: data.nameSearch,
                limit: data.limit,
                page: data.page
            }
        }

        axios.get('http://127.0.0.1:3001/products/', config)
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            dataProduct: res.data.data.searchResult,
                            dataTotal: res.data.data.totalData,
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

    paginationClick = (e) => {
        const data = {
            nameSearch: this.state.searchData,
            limit: "5",
            page: e.target.value - 1,
            product_name: this.state.product_name,
            category_id: this.state.category_id
            //date
            //sorter
        }
        console.log(data);

        const dataAccount = JSON.parse(localStorage.getItem('dataAccount'))
        const config = {
            headers : {authorization: dataAccount.token},
            params: {
                nameSearch: data.nameSearch,
                limit: data.limit,
                page: data.page,
                product_name: data.product_name,
                category_id: data.category_id
            }
        }
        axios.get('http://127.0.0.1:3001/products/', config)
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            dataProduct: res.data.data.searchResult,
                            dataTotal: res.data.data.totalData,
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

    handleLogout = (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('dataAccount');
            this.props.history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    formatRupiah = (angka,prefix)=>{
        let number_string = angka.toString().replace(/[^,\d]/g, '');
        let split = number_string.split(',');
        let remains  = split[0].length % 3;
        let rupiah   = split[0].substr(0, remains);
        let thausand = split[0].substr(remains).match(/\d{3}/gi);

        if(thausand){
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
        const { data, isOpen, dataProduct, dataTotal, searchData, category_data, cart, orders } = this.state
        const page = Math.ceil(dataTotal / 5)
        const pages = [];
        for (let i = 0; i <= page; i++) {
            if (i !== page) { pages.push(i) }
        }
        return (
            <div>
                <Sidebar category={this.state.category_data}/>
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
                <Navbar color="light" light expand="md" style={{ marginBottom: "10px" }}>
                    <NavbarBrand href="/">Restaurant Roni</NavbarBrand>
                    <NavbarToggler onClick={this.handleToggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
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
                                <DropdownToggle nav caret>
                                    Search by Category
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {category_data.map((data, i) => {
                                        return (
                                            <DropdownItem value={data.category_id} onClick={(e) => { this.searchByCategory(e) }}>
                                                {data.category_name}
                                            </DropdownItem>
                                        )
                                    })}
                                    {/* <DropdownItem divider /> */}
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
                        <NavbarText>{data.name}</NavbarText>
                        <Nav>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Others
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/order">Order</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavLink onClick={(e) => { this.handleLogout(e) }}>Logout</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>
                    {/* <div style={{display:"inline-block", minHeight:"100%", width:"400px",backgroundColor:"blue", float:"right"}}>

                    </div> */}
                    <Row>
                        <Col>
                            <Row>
                                {dataProduct.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                                    const item = data;
                                    if (i < 3) {
                                        return (
                                            <Col style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width={208} height={138} src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <CardSubtitle>Rp.{this.formatRupiah(data.product_price)}</CardSubtitle>
                                                        <div style={{ display: "inline-flex" }}>
                                                            <Button style={{ marginRight: "5px" }} onClick={(e) => {
                                                                this.addOrderButton(e, item)
                                                            }}>Add</Button>
                                                            <ModalDetailProduct product_id={data.product_id} category_data={category_data} data={data} />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })}
                            </Row>
                            <Row>
                                {dataProduct.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '')
                                    const item = data;
                                    if (i >= 3) {
                                        return (
                                            <Col style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width={208} height={138} src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <CardSubtitle>Rp.{this.formatRupiah(data.product_price)}</CardSubtitle>
                                                        <div style={{ display: "inline-flex" }}>
                                                            <Button style={{ marginRight: "5px" }} onClick={(e) => {
                                                                this.addOrderButton(e, item)
                                                            }}>Add</Button>
                                                            <ModalDetailProduct product_id={data.product_id} category_data={category_data} data={data} />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })}
                            </Row>
                        </Col>
                        <Col xs="4" style={{ padding: "0" }}>
                            <div style={style.cartDiv}>
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
                                                <div style={{marginLeft : "20px"}}>
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
                                <ButtonToggle onClick={(e) => { this.handleCancel(e) }} style={style.buttonCheckout} color="danger">Cancel</ButtonToggle></div>) : (<div style={{textAlign: "center"}}><img height={300} width={300} src={cartImage} alt="Logo"></img><p>Keranjang Kosong</p></div>)}
                            </div>
                        </Col>
                    </Row>
                    <Pagination size="sm">
                        {
                            pages.map((page, i) => {
                                return (
                                    <PaginationItem >
                                        <PaginationLink value={page + 1} onClick={(e) => { this.paginationClick(e) }}>
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            }
                            )
                        }
                    </Pagination>
                </Container>
            </div>
        )
    }
}

export default withRouter(Home);

Home.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
