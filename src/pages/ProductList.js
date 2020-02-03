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

class ProductList extends React.Component {

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
    }

    render() {
        return (
            <React.Fragment>
            <NavbarNavigation />
            <Container>
            <ModalAddProduct />
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
                {this.props.products.isLoading ? (this.props.products.dataProducts.data.data.searchResult.map((data,i)=>{
                        const product_image = "http://localhost:3001/" + data.product_image.replace('assets', '');
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><img width={80} height={80} src={product_image} alt='product_image'/></td>
                                <td>{data.product_name}</td>
                                <td>{data.product_description}</td>
                                <td>{data.product_price}</td>
                                <td style={{textAlign: "center"}}>
                                <ModalUpdateProduct product_id={data.product_id} data={data}>
                                    Update
                                </ModalUpdateProduct> {' '}
                                <ModalDeleteProduct product_id={data.product_id}>
                                    Delete
                                </ModalDeleteProduct>
                                </td>
                            </tr>

                        )
                    })):''}
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
        category : state.category
    }
}

export default connect(mapStateToProps)(ProductList)