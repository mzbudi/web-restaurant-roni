import React from 'react';
import { Table, Container , Button} from 'reactstrap';
import {connect} from 'react-redux';
import {requestProducts} from '../public/redux/action/products';
import axios from 'axios';
import qs from 'qs';
import ModalUpdateProduct from '../components/ModalUpdateProduct';
import ModalDeleteProduct from '../components/ModalDeleteProduct';
import ModalAddProduct from '../components/ModalAddProduct';
import NavbarNavigation from '../components/NavbarNavigation';

class CashierList extends React.Component {

    componentDidMount(){
        const config = {
            headers : {authorization: this.props.auth.data.data.data.token},
            params:{
                nameSearch : '',
                category_id : '',
                limit : '1000',
                page : 0,
                product_name : '',
                date : '',
            }
        }

        this.props.dispatch(requestProducts(config))
            // .then((res)=>{console.log(res)})
    }
    // componentWillMount(){
    //     this.props.dispatch(requestProducts())
    // }

    dispatchProducts = (e) =>{
        this.props.dispatch(requestProducts())
            .then((res)=>{
                console.log(res)
            })
    }
    render() {
        // console.log(this.props.products)
        return (
            <React.Fragment>
            <NavbarNavigation />
            <Container>
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>User Role</th>
                        <th>Created At</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.users.userData.data.data.map((data,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.user_id}</td>
                                <td>{data.user_role}</td>
                                <td>{data.username}</td>
                                <td>{data.name}</td>
                                <td>{data.created_at}</td>
                                <td style={{textAlign: "center"}}>
                                <ModalUpdateProduct product_id={1}>
                                    Update
                                </ModalUpdateProduct> ||{' '}
                                <ModalDeleteProduct product_id={1}>
                                    Delete
                                </ModalDeleteProduct>
                                </td>
                            </tr>

                        )
                    })}
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