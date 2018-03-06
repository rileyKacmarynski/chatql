import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {withApollo} from 'react-apollo' 

import Layout from './containers/Layout/Layout';
import Messenger from "./containers/Messenger/Messenger";
import Logout from './components/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent';
import { AUTH_TOKEN } from './constants';

const Signup = asyncComponent(() => {
  return import('./components/Auth/Signup/Signup');
});

const Login = asyncComponent(() => {
  return import('./components/Auth/Login/Login');
});

class App extends Component {
  render() {
    let routes= (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Messenger} />
        <Redirect to="/" />
      </Switch>
    )
    if(localStorage.getItem(AUTH_TOKEN) != null){
        routes = (
          <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Messenger} />
          <Redirect to="/" />
        </Switch>
        ) 
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default withApollo(App);