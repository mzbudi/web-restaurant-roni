import React from 'react';
import PropTypes from 'prop-types';

class NavbarNavigation extends React.Component{
    render(){
        return(
            <div>
                {this.props.name}
            </div>
        )
    }
}

export default NavbarNavigation;

NavbarNavigation.propTypes = {
    name : PropTypes.string,
}
