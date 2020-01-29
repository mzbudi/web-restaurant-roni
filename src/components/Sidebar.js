import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
// import plus from '../images/plus.png'
import ModalProduct from '../components/ModalProduct'
import ModalCategory from '../components/ModalCategory'

class Sidebar extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props.category)
        return (
            <div className="sidebar">
                <ModalProduct category={this.props.category}/>{' '}
                <ModalCategory />
            </div>
        )
    }
}

export default Sidebar;

Sidebar.propTypes = {
    name: PropTypes.string,
}
