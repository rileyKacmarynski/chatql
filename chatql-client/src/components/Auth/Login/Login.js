import React, { PureComponent } from 'react';
import classes from '../Auth.css';
import { Grid, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import LogoHeader from '../../../components/LogoHeader/LogoHeader';
import LoginForm from '../../../containers/auth/login-form';

export class Login extends PureComponent {
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
