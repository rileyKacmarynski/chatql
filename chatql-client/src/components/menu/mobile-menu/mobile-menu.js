import React from 'react';
import { Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Logo from '../../UI/Logo/Logo'

const MobileMenu = (props) => {


  
  return (
    <Menu>
      <Menu.Item onClick={props.toggleVisibility}>
        <Icon name="content" color="pink" />
      </Menu.Item>
      <Menu.Item 
        position="right"
        as={Link}
        exact
        to="/"
      >
        <Logo size="mini" />
      </Menu.Item>
    </Menu>
  )
};

export default MobileMenu;
