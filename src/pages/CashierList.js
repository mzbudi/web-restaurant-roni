import React from 'react';
import { Table, Container , Button} from 'reactstrap';
import {connect} from 'react-redux';
import {requestProducts} from '../public/redux/action/products';
import {requestUsers} from '../public/redux/action/users';
import axios from 'axios';
import qs from 'qs';
import ModalUpdateUser from '../components/ModalUpdateUser';
import ModalDeleteUser from '../components/ModalDeleteUser';
import ModalAddUser from '../components/ModalAddUser';
import NavbarNavigation from '../components/NavbarNavigation';
import bgImage from '../images/batikbg.jpg';
import Moment from 'moment';
import style from '../styles.js';

class CashierList extends React.Component {

    componentDidMount(){
        const headers = { authorization: this.props.auth.data.data.data.token }
        const config = {
            headers
        }

        this.props.dispatch(requestUsers(config))
            // .then((res)=>{console.log(res)})
    }
    // componentWillMount(){
    //     this.props.dispatch(requestProducts())
    // }

    render() {
        // console.log(this.props.products)
        return (
            <React.Fragment>
            <NavbarNavigation />
            <Container>
            <ModalAddUser />
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>User Role</th>
                        <th>Date</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.users.isLoading ? (
                    this.props.users.userData.data.data.map((data,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.user_id}</td>
                                <td>{data.name}</td>
                                <td>{data.username}</td>
                                <td>{data.user_role == 2 ? 'Cashier' : 'Admin'}</td>
                                <td>{Moment(data.created_at).format('DD/MM/YYYY')}</td>
                                <td style={{textAlign: "center"}}>
                                <ModalUpdateUser user_id={data.user_id} name={data.name} data={data}>
                                    Update
                                </ModalUpdateUser>{' '}
                                <ModalDeleteUser user_id={data.user_id} name={data.name}>
                                    Delete
                                </ModalDeleteUser>
                                </td>
                            </tr>

                        )
                    })
                ) : ''}
                </tbody>
            </Table>
            </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth,
        products : state.products,
        category : state.category,
        users : state.users
    }
}

export default connect(mapStateToProps)(CashierList)