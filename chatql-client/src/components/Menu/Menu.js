import React, {Component } from 'react';
import { Menu, Image, Button, Container } from 'semantic-ui-react'
import { NavLink, } from 'react-router-dom';

import logo from '../../content/graphqlLogo.png';

class MainMenu extends Component {
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, {name}) => 
        this.setState({ activeItem: name });
     
    render(){
        const { activeItem } = this.state;

        return (
            <Menu stackable pointing secondary >
            <Menu.Item style={{paddingBottom: '0'}}>
                <Image
                        size='mini'
                        src={logo}
                    />
            </Menu.Item>
            <Menu.Item 
                    as={NavLink}
                    exact
                    to="/"
                    name='home'
                    color='pink'
            />
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
        </Menu>
        )
    }

}

export default MainMenu;
