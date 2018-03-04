import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Messenger from "./containers/Messenger/Messenger";
import Login from './components/Auth/Login/Login';
import Logout from './components/Auth/Logout/Logout';
import Signup from './components/Auth/Signup/Signup';
import { isAuthenticated } from './helpers/auth';

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

    if(isAuthenticated()){
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

export default App;
