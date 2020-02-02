import React from 'react';
import { Table, Container , Button} from 'reactstrap';
import {connect} from 'react-redux';
import {requestProducts} from '../public/redux/action/products';
import axios from 'axios';
import qs from 'qs';
import ModalUpdateCategory from '../components/ModalUpdateCategory';
import ModalDeleteCategory from '../components/ModalDeleteCategory';
import ModalAddCategory from '../components/ModalAddCategory';
import NavbarNavigation from '../components/NavbarNavigation';

class CategoryList extends React.Component {

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
            <ModalAddCategory />
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Created At</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.category.dataCategory.data.data.map((data,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.category_name}</td>
                                <td>{data.created_at}</td>
                                <td style={{textAlign: "center", display:"flex"}}>
                                <ModalUpdateCategory category_id={data.category_id} category_name={data.category_name}>
                                    Update
                                </ModalUpdateCategory> ||{' '}
                                <ModalDeleteCategory category_id={data.category_id} category_name={data.category_name}>
                                    Delete
                                </ModalDeleteCategory>
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
        category : state.category
    }
}

export default connect(mapStateToProps)(CategoryList)