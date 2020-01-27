import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
// import plus from '../images/plus.png'
import ModalProduct from '../components/ModalProduct'
import ModalCategory from '../components/ModalCategory'

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <ModalProduct />{' '}
                <ModalCategory />
            </div>
        )
    }
}

export default Sidebar;

Sidebar.propTypes = {
    name: PropTypes.string,
}
