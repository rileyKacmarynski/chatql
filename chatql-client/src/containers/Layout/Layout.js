import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import { getCurrentCredential } from '../../querys/auth-queries';
import Container from '../../hoc/container';
import MobileLayout from '../../components/UI/Layouts/MobileLayout';
import DesktopLayout from '../../components/UI/Layouts/DesktopLayout';

export class Layout extends Component { 
    state = {
        sidebarVisible: false
    }
    
    toggleVisibility = () => 
        this.setState((prevState, props) => {
            return{
                sidebarVisible: !prevState.sidebarVisible
            }
        });

    linkFromSidebar = (to) => {
        this.toggleVisibility();
        this.props.history.push(to);
    }

    render() {
        
        const { token } = this.props.getCurrentCredential;
        const isAuthenticated = token && token !== "";
        console.log(isAuthenticated);
        return (
            <Container>
                <MobileLayout 
                    sidebarVisible={this.state.sidebarVisible}
                    toggleVisibility={this.toggleVisibility}
                    linkFromSidebar={this.linkFromSidebar}
                    isAuthenticated={isAuthenticated}
                    {...this.props} />
                <DesktopLayout 
                    isAuthenticated={isAuthenticated} 
                    {...this.props}/>

            </Container>
        )
    }
};

export default withRouter(getCurrentCredential(Layout));
