import React from 'react';
import PropTypes from 'prop-types';
import NavbarNavigation from '../components/NavbarNavigation'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        if(!data){
            console.log(data);
            this.props.history.push('/login')
        }
    }

    render(){
        return(
            <div>
               <NavbarNavigation />
            </div>
        )
    }
}

export default Home;

Home.propTypes = {
    name : PropTypes.string,
}
