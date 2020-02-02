import React from 'react';
import PropTypes from 'prop-types';

class Order extends React.Component{

    render(){
        return(
            <div>
                ini Halaman Order
            </div>
        )
    }
}

export default Order;

Order.propTypes = {
    name : PropTypes.string,
}
