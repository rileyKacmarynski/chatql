import React from 'react';
import {Header, Image } from 'semantic-ui-react';

import Logo from '../UI/Logo/Logo';

const LogoHeader = (props) => {
  return (
    <Header  as='h2' primary textAlign='center'>
        <Logo size='huge'/>    
        {props.children}
  </Header>
  )
};

export default LogoHeader;
