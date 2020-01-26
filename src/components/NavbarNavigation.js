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

class NavbarNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            data:[]
        }
    }

    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        if(!data){
            this.props.history.push('/login')
        }
        this.setState({
            data: data
        })
    }

    handleLogout =(e)=>{
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
        const {data, isOpen} = this.state
        return (
            <div>
                <Navbar color="light" light expand="md" style={{marginBottom:"10px"}}>
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
                                        <NavLink onClick={(e)=>{this.handleLogout(e)}}>Logout</NavLink>
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
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText></CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                            </Row>
                            <Row>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                            </Row>
                            <Row>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                                <Col><Card>
                                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card></Col>
                            </Row>
                        </Col>
                        <Col xs="4" style={{border: "1px solid black" }}>
                            1 of 2
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
