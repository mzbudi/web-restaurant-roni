import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
// import plus from '../images/plus.png'
import ModalProduct from '../components/ModalProduct'
import ModalAddCategory from './ModalAddCategory';
import ModalUpdateCategory from './ModalUpdateCategory'
import ModalDeleteCategory from './ModalDeleteCategory'

class Sidebar extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="sidebar">
                <ModalProduct category={this.props.category}/>
                <ModalAddCategory />
                <ModalUpdateCategory category={this.props.category} />
                <ModalDeleteCategory category={this.props.category} />
            </div>
        )
    }
}

export default Sidebar;

Sidebar.propTypes = {
    name: PropTypes.string,
}
