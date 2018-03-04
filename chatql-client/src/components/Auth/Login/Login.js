import React, { Component } from 'react';
import classes from '../Auth.css';
import {Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import LoginForm from './LoginForm';

export class Login extends Component {
  render() {
    return (
      <div className={classes.Auth}>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{maxWidth: '450px'}}>
            <LogoHeader>Log-in to your account</LogoHeader>
            <LoginForm buttonText='Login'/>
            <Message>
              Don't have an account?  
              <NavLink to='/signup'> Sign-up</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default Login;
