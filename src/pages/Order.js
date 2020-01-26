import React from 'react';
import PropTypes from 'prop-types';

class Order extends React.Component{

    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        if(!data){
            this.props.history.push('/login')
        }
    }
    
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
