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

class NavbarNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
        // this.handleSearchProduct = this.handleSearchProduct.bind(this)
    }
    render() {
        return (
            <Navbar color="light" light expand="md" style={{ marginBottom: "10px" }}>
                <NavbarBrand href="/">Restaurant Roni</NavbarBrand>
                <NavbarToggler onClick={this.handleToggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText></NavbarText>
                    <Nav>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Others
                                </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                    <Link to="/">Home</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to="/order">Order</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to="/products">Products</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to="/category">Category</Link>
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
        )
    }
}

const mapStateToProps = state => {
    return{
        auth : state.auth,
        products : state.products,
        category : state.category
    }
}

export default connect(mapStateToProps)(withRouter(NavbarNavigation));