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
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {
    withRouter,
    Link
} from 'react-router-dom';
import style from '../styles.js';
import ModalCategory from './ModalCategory';
import axios from 'axios';

class NavbarNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            data: [],
            dataProduct: [],
            dataTotal: [],
            gambar: ''
        }
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
                                dataProduct: res.data.data,
                                dataTotal: res.data.data.searchResult,
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
        const { data, isOpen, dataProduct, dataTotal } = this.state
        // console.log(dataProduct.searchResult[0])
        // console.log(dataTotal[0])


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
                                    <DropdownItem>
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
                                        {/* Search by Name */}
                                        <ModalCategory></ModalCategory>
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
                                {dataTotal.map((data, i) => {
                                    const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '')
                                    if (i < 3) {
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
                                {dataTotal.map((data, i) => {
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
                                {dataTotal.map((data, i) => {
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
                                <CardImg top width="100%" src="http://localhost:3001/images//product_image-1579493748132.jpg" alt="Card image cap" />
                                
                                <CardBody>
                                    <CardTitle>Keranjang</CardTitle>
                                    <Button>Add</Button>{' '}
                                    <Button>Detail</Button>
                                </CardBody>
                            </Card>
                            {/* <div style={{padding:"0", display:"inline-block", minHeight:"10%", width:"100%",backgroundColor:"blue", float:"right"}}>
                                <center><p>Cart</p></center>
                            </div> */}
                        </Col>
                    </Row>
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
