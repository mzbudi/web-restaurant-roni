import React from 'react';
import { Table, Container , Button} from 'reactstrap';
import {connect} from 'react-redux';
import {requestProducts} from '../public/redux/action/products';
import {requestCategory} from '../public/redux/action/category';
import axios from 'axios';
import qs from 'qs';
import ModalUpdateCategory from '../components/ModalUpdateCategory';
import ModalDeleteCategory from '../components/ModalDeleteCategory';
import ModalAddCategory from '../components/ModalAddCategory';
import NavbarNavigation from '../components/NavbarNavigation';
import Moment from 'moment';

class CategoryList extends React.Component {

    componentDidMount(){
        const headers = { authorization: this.props.auth.data.data.data.token }
        const configCategory = {
            headers
        }
        this.props.dispatch(requestCategory(configCategory));
    }

    render() {
        // console.log(this.props.products)
        return (
            <React.Fragment>
            <NavbarNavigation />
            <Container>
            <ModalAddCategory />
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Date</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.category.isLoading ? (
                    this.props.category.dataCategory.data.data.map((data,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.category_name}</td>
                                <td>{Moment(data.created_at).format('DD/MM/YYYY')}</td>
                                <td style={{textAlign: "center"}}>
                                <ModalUpdateCategory category_id={data.category_id} category_name={data.category_name} data={data}>
                                    Update
                                </ModalUpdateCategory>
                                <ModalDeleteCategory category_id={data.category_id} category_name={data.category_name}>
                                    Delete
                                </ModalDeleteCategory>
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
        category : state.category
    }
}

export default connect(mapStateToProps)(CategoryList)