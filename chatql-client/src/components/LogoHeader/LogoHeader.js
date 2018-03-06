import React from 'react';
import { Header } from 'semantic-ui-react';

import Logo from '../UI/Logo/Logo';

const LogoHeader = (props) => {
  return (
    <Header  as='h2' primary={"true"} textAlign='center'>
        <Logo size='huge'/>    
        {props.children}
  </Header>
  )
};

export default LogoHeader;
