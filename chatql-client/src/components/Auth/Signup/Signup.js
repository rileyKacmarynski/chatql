import React, { Component } from 'react';
import classes from '../Auth.css';
import { Grid} from 'semantic-ui-react';
import LogoHeader  from '../../../components/LogoHeader/LogoHeader';
import SignupForm from '../../../containers/auth/signup-form';

export class Signup extends Component {
  render() {
    return (
      <div className={classes.Auth}>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{maxWidth: '450px'}}>
            <LogoHeader>Sign-up to start messaging</LogoHeader>
            <SignupForm buttonText='Signup'/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default Signup;