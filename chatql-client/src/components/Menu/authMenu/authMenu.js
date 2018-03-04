import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import {NavLink } from 'react-router-dom'

import { isAuthenticated } from '../../../helpers/auth';

export class AuthMenu extends Component {
    render() {
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
            debugger;
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
        return  authMenu;
    }       
};

export default AuthMenu;
