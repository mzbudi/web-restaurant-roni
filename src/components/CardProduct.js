import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import {formatRupiah} from '../public/helper/parsePrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ModalDetailProduct from './ModalDetailProduct';
import { connect } from 'react-redux';
import { addCart } from '../public/redux/action/cart'

class CardProduct extends React.Component {

  addOrderButton = (e, item) => {
    this.props.dispatch(addCart(item))
  }

  render() {
    const {_key, data, product_image} = this.props;
    return (
      <Card key={_key + 1}>
        <CardImg top width={208} height={138} src={product_image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{data.product_name}</CardTitle>
            <CardSubtitle>{formatRupiah(data.product_price, 'Rp. ')}</CardSubtitle>
            <div style={{ display: "inline-flex" }}>
              <Button style={{ marginRight: "5px" }} onClick={(e) => {
                this.addOrderButton(e, data)
              }}>
                <FontAwesomeIcon color='white' icon={faPlusCircle} />
                Add</Button>
              {this.props.category.isLoading ? (this.props.category.dataCategory.data.data.map((item, index) => {
                if(data.category_id === item.category_id){
                  return(
                    <ModalDetailProduct product_id={data.product_id} category={item} data={data} />
                   )
                }
               })):''}
            </div>
          </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    category: state.category
  }
}


export default connect(mapStateToProps)(CardProduct)