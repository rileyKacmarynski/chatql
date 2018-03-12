import React from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink, } from 'react-router-dom';

import Logo from '../UI/Logo/Logo';
import AuthMenu  from './authMenu/authMenu';

const MainMenu = props => {
    return (
        <Menu pointing secondary>
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
            <AuthMenu isAuthenticated={props.isAuthenticated}/>
        </Menu>
    )
}



export default MainMenu;
