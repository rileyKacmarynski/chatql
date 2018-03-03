import React, {Component } from 'react';
import { Menu, Image } from 'semantic-ui-react'
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
            <Menu stackable inverted >
            <Menu.Item>
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
            />
            <Menu.Menu position='right'>
                <Menu.Item 
                    as={NavLink}
                    exact
                    to="/login"
                    name='login'
                />
                <Menu.Item 
                    as={NavLink}
                    exact
                    to="/signup"
                    name='signup'
                />
                {/* <Menu.Item 
                    as={NavLink}
                    to="/logout"
                    name='logout'
                    active={activeItem == 'logout'}
                    onClick={this.handleItemClick}
                /> */}
            </Menu.Menu>
        </Menu>
        )
    }

}

export default MainMenu;
