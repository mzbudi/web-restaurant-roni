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
import ModalCategory from './ModalCategory';
import axios from 'axios';
import qs from 'qs';
import ModalDetailProduct from './ModalDetailProduct';


class NavbarNavigation extends React.Component {
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
            cart:[],
            orders:[],
            grandTotal : 0,
            modalCheckoutOpen: false,
        }
        this.handleSearchProduct = this.handleSearchProduct.bind(this)
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        if (!data) {
            this.props.history.push('/login')
        } else {
            axios.get('http://127.0.0.1:3001/products/')
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
                    console.log(err)
                })
            axios.get('http://127.0.0.1:3001/products/')
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
                    console.log(err)
                })
            axios.get('http://127.0.0.1:3001/category')
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
                    console.log(err)
                })
        }
        this.setState({
            data: data
        })

    }

    // handleTotal = (totalPerProduct,product_id) => {
    //     this.setState({
    //         totalPrice : {...this.state.totalPrice, [{product_id:product_id, totalPerProduct:totalPerProduct}]}
    //     },()=>{
    //         console.log(this.state.totalPrice);
    //     })
    // }
    handleButton = (e) =>{
        this.setState({
            modalCheckoutOpen : !this.state.modalCheckoutOpen
        })
    }

    incrementOrder = (e, product_price) =>{
        this.setState({
            orders: this.state.orders.map((order)=>(order.product_id == e.target.id ? {...order, quantity:order.quantity + 1, totalPrice:product_price*(order.quantity + 1) } : order)),
            grandTotal : this.state.grandTotal + parseInt(product_price)
        })
    }
    //Post Order
    handleCheckout = (e) =>{
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        // console.log(data.user_id)

        const body ={
            user_id : data.user_id,
            orders : this.state.orders
        }

        axios.post('http://127.0.0.1:3001/order/', body)
            .then(res => {
                if (res.status === 200) {
                    try {
                        console.log(res)
                        this.setState({
                            cart:[],
                            orders:[],
                            grandTotal : 0,
                            modalCheckoutOpen : true
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }).catch(err => {
                console.log(err)
            })

        console.log(body)
    }

    decrementOrder = (e, product_price) =>{
        this.setState({
            orders: this.state.orders.map((order)=>(order.product_id == e.target.id ? {...order, quantity:order.quantity - 1, totalPrice:product_price*(order.quantity - 1) } : order)),
            grandTotal : this.state.grandTotal - parseInt(product_price)
        })
    }

    deleteFromCart = (e) =>{
        var totalPrice = 0
        this.state.orders.map((order,i)=>{
            if(order.product_id == e.target.id){
                totalPrice = order.totalPrice
            }
        })
        let cartForDelete = this.state.cart.filter((data)=>{ return data.product_id != e.target.id})
        let ordersForDelete = this.state.orders.filter((data)=>{ return data.product_id != e.target.id})
        this.setState({
            cart : cartForDelete,
            orders : ordersForDelete,
            grandTotal : this.state.grandTotal - parseInt(totalPrice)
        })
    }


    addOrderButton = (e,item) =>{
        let arrExist = [];
        if (this.state.cart.length === 0){
            this.setState({
                cart : [...this.state.cart, item],
                orders: [...this.state.orders, {
                    product_id : item.product_id,
                    product_price: item.product_price,
                    quantity : 1,
                    totalPrice : 1*item.product_price
                }],
                grandTotal: this.state.grandTotal + parseInt(item.product_price)
            },()=>{
                console.log(this.state.cart, this.state.orders)
            })
        }else{
            this.state.cart.map((data,i)=>{
                if(data.product_id === item.product_id){
                    arrExist.push('1')
                }
            })
            if(arrExist.length === 0){
                this.setState({
                    cart: [...this.state.cart,item],
                    orders: [...this.state.orders, {
                        product_id : item.product_id,
                        product_price: item.product_price,
                        quantity : 1,
                        totalPrice : 1*item.product_price
                    }],
                    grandTotal: this.state.grandTotal + parseInt(item.product_price)
                },()=>{
                    console.log(this.state.cart, this.state.orders)
                })
            }else{
                console.log('data Sudah ada')
            }
        }
    }

    searchByCategory = (e) =>{
        const data = {
            category_id: e.target.value,
            limit: "5",
            page: 0,
        }

        axios.get('http://127.0.0.1:3001/products/', {
            params: {
                category_id: data.category_id,
                limit: data.limit,
                page: data.page
            }
        })
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
                console.log(err)
            })
    }

    getSortFunction = (e) => {
        const data = {
            limit: "5",
            page: 0,
            date: this.state.date,
            product_name: this.state.product_name
        }
        axios.get('http://127.0.0.1:3001/products/', {
            params: {
                limit: data.limit,
                page: data.page,
                date: data.date,
                product_name: data.product_name,

            }
        })
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
                console.log(err)
            })
    }



    sortByName = (e) => {
        this.setState({
            product_name: 'product_name',
            date: ''
        }, () => {
            this.getSortFunction()
        });
    }

    sortByDate = (e) => {
        this.setState({
            date: 'updated_at',
            product_name: '',
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

        axios.get('http://127.0.0.1:3001/products/', {
            params: {
                nameSearch: data.nameSearch,
                limit: data.limit,
                page: data.page
            }
        })
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
                console.log(err)
            })
    }

    paginationClick = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)
        const data = {
            nameSearch: this.state.nameSearch,
            limit: "5",
            page: e.target.value - 1,
            product_name: this.state.product_name,
        }
        axios.get('http://127.0.0.1:3001/products/', {
            params: {
                nameSearch: data.nameSearch,
                limit: data.limit,
                page: data.page,
                product_name: data.product_name
            }
        })
            .then(res => {
                if (res.status === 200) {
                    try {
                        this.setState({
                            dataProduct: res.data.data.searchResult,
                            dataTotal: res.data.data.totalData,
                        })
                        console.log(res)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }).catch(err => {
                console.log(err)
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
                <Modal isOpen={this.state.modalCheckoutOpen} toggle={(e)=>{this.handleButton(e)}}>
                    <ModalHeader toggle={(e)=>{this.handleButton(e)}}>Detail Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <p>Pesanan Sudah Di Input</p>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e)=>{this.handleButton(e)}}>Submit</Button>{' '}
                        <Button color="secondary" onClick={(e)=>{this.handleButton(e)}}>Cancel</Button>
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
                                    {category_data.map((data,i)=>{
                                        return(
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
                                                    <CardImg top width="100%" src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <div style={{display:"inline-flex"}}>
                                                            <Button style={{marginRight:"5px"}} onClick={(e)=>{
                                                                this.addOrderButton(e,item)
                                                                }}>Add</Button>
                                                            <ModalDetailProduct />
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
                                                    <CardImg top width="100%" src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <div style={{display:"inline-flex"}}>
                                                        <Button style={{marginRight:"5px"}} onClick={(e)=>{
                                                                this.addOrderButton(e,item)
                                                                }}>Add</Button>
                                                            <ModalDetailProduct />
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
                                    if (i >= 5) {
                                        return (
                                            <Col style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width="100%" src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <div style={{display:"inline-flex"}}>
                                                        <Button style={{marginRight:"5px"}} onClick={(e)=>{
                                                                this.addOrderButton(e,item)
                                                                }}>Add</Button>
                                                            <ModalDetailProduct />
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
                                    {cart.map((data,i)=>{
                                        const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                                        // this.handleTotal(totalPerProduct,data.product_id);
                                        return(
                                            <div style={{display:"flex"}}>
                                                <div style={style.cartItem}>
                                                    <img alt="" src={product_image} height={80} width={80} />
                                                </div>
                                                <div style={style.incrementCart}>
                                                    <div style={{display:"flex"}}>
                                                        <Button id={data.product_id} disabled={orders[i].quantity == 1 ? true : false} color="info" onClick={(e)=>{this.decrementOrder(e,data.product_price)}}>-</Button>{' '}
                                                            <Input type="number" defaultValue={1} value={orders[i].quantity} />
                                                        <Button id={data.product_id} color="info" onClick={(e)=>{this.incrementOrder(e,data.product_price)}}>+</Button>{' '}
                                                    </div>
                                                </div>
                                                    <div>{orders[i].product_price * orders[i].quantity}</div>
                                                <div>
                                                    <Button id={data.product_id} color="danger" onClick={(e)=>{this.deleteFromCart(e)}}>x</Button>{' '}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                    <p>Sub Total : {this.state.grandTotal}</p>
                                    <p>PPN : {this.state.grandTotal * 0.10}</p>
                                    <p>Total : {this.state.grandTotal + (this.state.grandTotal * 0.10)}</p>
                                {this.state.orders.length > 0 ? (<div><ButtonToggle style={style.buttonCheckout} onClick={(e)=>{this.handleCheckout(e)}} color="info">Checkout</ButtonToggle>
                                <ButtonToggle style={style.buttonCheckout} color="danger">Cancel</ButtonToggle></div>):''}
                            </div>
                        </Col>
                    </Row>
                    <Pagination size="sm">
                        <PaginationItem>
                            <PaginationLink first href="#" />
                        </PaginationItem>
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
                        <PaginationItem>
                            <PaginationLink last href="#" />
                        </PaginationItem>
                    </Pagination>
                </Container>
            </div>
        )
    }
}

export default withRouter(NavbarNavigation);

NavbarNavigation.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
