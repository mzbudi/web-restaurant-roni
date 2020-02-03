import React from 'react';
import PropTypes from 'prop-types';
import NavbarNavigation from '../components/NavbarNavigation';
import { Table, Container , Button} from 'reactstrap';

class Order extends React.Component{

    render(){
        return(
            <React.Fragment>
            <NavbarNavigation />
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {/* {this.props.products.dataProducts.data.data.searchResult.map((data,i)=>{
                        const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><img width={80} height={80} src={product_image} alt='product_image'/></td>
                                <td>{data.product_name}</td>
                                <td>{data.product_description}</td>
                                <td>{data.product_price}</td>
                                <td style={{textAlign: "center"}}>
                                <ModalUpdateProduct product_id={data.product_id}>
                                    Update
                                </ModalUpdateProduct> ||{' '}
                                <ModalDeleteProduct product_id={data.product_id}>
                                    Delete
                                </ModalDeleteProduct>
                                </td>
                            </tr>

                        )
                    })} */}
                </tbody>
            </Table>
            </React.Fragment>
        )
    }
}

export default Order;
