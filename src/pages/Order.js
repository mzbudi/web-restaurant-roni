import React from 'react';
import PropTypes from 'prop-types';
import NavbarNavigation from '../components/NavbarNavigation';
import { Table, Container , Button} from 'reactstrap';
import {connect} from 'react-redux';
import {requestOrder} from '../public/redux/action/order'

class Order extends React.Component{

    componentDidMount(){
        const config = {
            headers : {authorization: this.props.auth.data.data.data.token},
        }

        this.props.dispatch(requestOrder(config))
    }

    render(){
        return(
            <React.Fragment>
            <NavbarNavigation />
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Order ID</th>
                        <th>Invoice Number</th>
                        <th>User Id</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Product Price</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.order.isLoading ? (
                    this.props.order.data.data.data.map((data,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.order_id}</td>
                                <td>{data.invoice_number}</td>
                                <td>{data.user_id}</td>
                                <td>{data.product_id}</td>
                                <td>{data.quantity}</td>
                                <td>{data.product_price}</td>
                                <td style={{textAlign: "center"}}>
                                </td>
                            </tr>

                        )
                    })
                ) : ''}
                </tbody>
            </Table>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth : state.auth,
        products: state.products,
        order: state.order,
    }
}

export default connect(mapStateToProps)(Order);
