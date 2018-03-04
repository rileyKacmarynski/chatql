import React, {Component } from 'react';
import { Menu, Image, Button, Container } from 'semantic-ui-react'
import { NavLink, } from 'react-router-dom';

import Logo from '../UI/Logo/Logo';
import { AuthMenu } from './authMenu/authMenu';
import { isAuthenticated } from '../../helpers/auth';

class MainMenu extends Component {
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, {name}) => 
        this.setState({ activeItem: name });
     
    render(){
        const { activeItem } = this.state;
        let authMenu = (
            <Menu.Menu position='right'>
            <Menu.Item 
                as={NavLink}
                exact
                to="/login"
                name='login'
                color='pink'
            />
            <Menu.Item 
                as={NavLink}
                exact
                to="/signup"
                name='signup'
                color='pink'
            />
        </Menu.Menu>
        );
        if(isAuthenticated()){
            authMenu = 
            (
                <Menu.Menu position='right'>
                    <Menu.Item 
                        as={NavLink}
                        exact
                        to="/logout"
                        name='logout'
                        color='pink'
                    />
                </Menu.Menu>
            );
        }
        return (
            <Menu stackable pointing secondary >
                <Menu.Item style={{paddingBottom: '0'}}>
                    <Logo size='mini' />
                </Menu.Item>
                <Menu.Item 
                    as={NavLink}
                    exact
                    to="/"
                    name='home'
                    color='pink'
                />
            <AuthMenu />
        </Menu>
        )
    }

}

export default MainMenu;
