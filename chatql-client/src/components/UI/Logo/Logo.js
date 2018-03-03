import logo from '../../../content/graphqlLogo.png'
import React from 'react';
import { Image } from 'semantic-ui-react';

const Logo = (props) => {
  return (
    <Image size={props.size} src={logo} />
  )
};

export default Logo;
