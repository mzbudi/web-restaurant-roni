import React from 'react';
import '../index.css'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table
} from 'reactstrap';
import {formatRupiah} from '../public/helper/parsePrice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBan } from '@fortawesome/free-solid-svg-icons';


class ModalDetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            updateOpen : false,
            deleteOpen: false,
            category_data:[],
            newProduct : {
                category_id: "5"
            },
            warningModal:false,
            messageWarning : "Proses Berhasil"
        }
    }

    handleClick = () => {
        this.setState({
            isOpen: true
        })
    }

    handleButton = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        const { isOpen } = this.state
        const {data, product_id, category} = this.props;
        return (
            <div>
                <Button color="dark" onClick={this.handleClick}>
                  <FontAwesomeIcon color='white' icon={faInfoCircle} />
                  {' '}Detail
                </Button>
                <Modal isOpen={isOpen} toggle={this.handleClick} className="apakek">
                  <ModalHeader toggle={this.handleButton}> Detail Product</ModalHeader>
                    <ModalBody>
                    <img width={465} alt='' src={"http://localhost:3001/" + data.product_image.replace('assets', '')}></img>
                      <Table bordered>
                        <tbody>
                          <tr>
                            <td>Product Id</td>
                            <td>{product_id}</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>{category ? (category.category_name):('')}</td>
                          </tr>
                          <tr>
                            <td>Product Description</td>
                            <td>{data.product_description}</td>
                          </tr>
                          <tr>
                            <td>Product Price</td>
                            <td>{`${formatRupiah(data.product_price, 'Rp. ')}`}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleButton}>
                          <FontAwesomeIcon color='white' icon={faBan}/>
                          {' '} Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ModalDetailProduct;