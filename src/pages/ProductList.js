import React from 'react';
import { Table, Container , Button} from 'reactstrap';
import {connect} from 'react-redux';
import {requestProducts} from '../public/redux/action/products';
import ModalUpdateProduct from '../components/ModalUpdateProduct';
import ModalDeleteProduct from '../components/ModalDeleteProduct';
import ModalAddProduct from '../components/ModalAddProduct';
import NavbarNavigation from '../components/NavbarNavigation';
import {formatRupiah} from '../public/helper/parsePrice';
import style from '../styles'


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

    componentWillMount(){
        if(this.props.auth.length === 0){
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <React.Fragment>
            <NavbarNavigation />
            <Container>
            <ModalAddProduct />
            <Table style={{backgroundColor: '#ffffff'}} bordered>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No</th>
                        <th style={{textAlign: "center"}}>Product Image</th>
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
                                <th style={style.centerCentered} scope='row'>{i+1}</th>
                                <td style={style.centerCentered}><img width={80} height={80} src={product_image} alt='product_image'/></td>
                                <td style={style.verticalCentered}>{data.product_name}</td>
                                <td style={style.verticalCentered}>{data.product_description}</td>
                                <td style={style.verticalCentered}>{formatRupiah(data.product_price, 'Rp. ')}</td>
                                <td style={style.centerCentered}>
                                <ModalUpdateProduct product_id={data.product_id} data={data} />
                                {' '}
                                <ModalDeleteProduct product_id={data.product_id} />
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