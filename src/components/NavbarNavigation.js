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
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import {
    withRouter,
    Link
} from 'react-router-dom';
import style from '../styles.js';
import ModalCategory from './ModalCategory';
import axios from 'axios';
import qs from 'qs';

class NavbarNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            data: [],
            dataProduct: [],
            dataTotal: [],
            searchData : "",
            product_name : ''
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
        }
        this.setState({
            data: data
        })

    }

    getSortFunction = (e) =>{
        const data = {
            limit: "5",
            page: 0,
            product_name : this.state.product_name
        }
        axios.get('http://127.0.0.1:3001/products/',{params:{
            limit:data.limit, 
            page:data.page,
            product_name : data.product_name
        }})
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

    sortByName = (e) =>{
        this.setState({
            product_name : 'product_name',
        }, this.getSortFunction());
    }

    handleSearchProduct = (e) =>{
        e.preventDefault();
        this.setState({
            searchData : e.target.value
        })

        const data = {
            nameSearch : this.state.searchData,
            limit: "5",
            page: 0,
        }

        axios.get('http://127.0.0.1:3001/products/',{params:{
            nameSearch: data.nameSearch, 
            limit:data.limit, 
            page:data.page
        }})
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

    paginationClick = (e) =>{
        // e.preventDefault();
        // console.log(e.target.value)
        const data = {
            nameSearch : this.state.nameSearch,
            limit: "5",
            page: e.target.value-1,
            product_name : this.state.product_name,
        }
        axios.get('http://127.0.0.1:3001/products/',{
            params:{
                nameSearch : data.nameSearch,
                limit:data.limit, 
                page:data.page,
                product_name : data.product_name}})
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
        const { data, isOpen, dataProduct, dataTotal, searchData } = this.state
        const page = Math.ceil(dataTotal/5)
        const pages = [];
        for(let i = 0 ; i<=page; i++){
            if(i!==page){pages.push(i)}
        }
        return (
            <div>
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
                                    <DropdownItem onClick={(e)=>{this.sortByName(e)}}>
                                        Sort by Name
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Sort by Newest
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Search Option
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Search by Name
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Search by Category Id
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search..."
                                onChange ={(e)=>{
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
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '')
                                    if (i < 3) {
                                        return (
                                            <Col style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top maxHeight="300px" width="100%" src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <Button>Add</Button>{' '}
                                                        <Button>Detail</Button>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })}
                            </Row>
                            <Row>
                                {dataProduct.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '')
                                    if (i >= 3) {
                                        return (
                                            <Col style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width="100%" src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <Button>Add</Button>{' '}
                                                        <Button>Detail</Button>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })}
                            </Row>
                            <Row>
                                {dataProduct.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '')
                                    if (i >= 5) {
                                        return (
                                            <Col style={style.columnCardPict}>
                                                <Card key={i + 1}>
                                                    <CardImg top width="100%" src={product_image} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle>{data.product_name}</CardTitle>
                                                        <Button>Add</Button>{' '}
                                                        <Button>Detail</Button>
                                                    </CardBody>
                                                </Card>
                                            </Col>);
                                    }
                                })}
                            </Row>
                        </Col>
                        <Col xs="4" style={{ padding: "0" }}>
                            <Card style={{ minHeight: "100%" }}>
                            </Card>
                            {/* <div style={{padding:"0", display:"inline-block", minHeight:"10%", width:"100%",backgroundColor:"blue", float:"right"}}>
                                <center><p>Cart</p></center>
                            </div> */}
                        </Col>
                    </Row>
                    <Pagination size="sm">
                        <PaginationItem>
                            <PaginationLink first href="#" />
                        </PaginationItem>
                        {
                            pages.map((page, i)=>{
                                    return(
                                        <PaginationItem >
                                            <PaginationLink value={page+1} onClick={(e)=>{this.paginationClick(e)}}>
                                                {page+1}
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
