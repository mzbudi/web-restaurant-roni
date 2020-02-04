import React from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import {
    withRouter,
    Link
} from 'react-router-dom';
import style from '../styles.js';

class NavbarNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
        // this.handleSearchProduct = this.handleSearchProduct.bind(this)
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <Navbar color="dark" dark expand="md" style={{ marginBottom: "10px" }}>
                <NavbarBrand href="/">Restaurant Roni</NavbarBrand>
                <NavbarToggler onClick={this.handleToggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText style={{color:"white"}}>{this.props.auth.data.data.data.name}</NavbarText>
                    <Nav>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{color:"white"}}>
                                Others
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to="/">
                                    <DropdownItem style={style.buttonNavbar}>Home</DropdownItem>
                                </Link>
                                <DropdownItem divider />
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
                                <DropdownItem>
                                    <NavLink onClick={(e) => { this.handleLogout(e) }}>Logout</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        products: state.products,
        category: state.category
    }
}

export default connect(mapStateToProps)(withRouter(NavbarNavigation));