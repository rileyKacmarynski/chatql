import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Messenger from "./containers/Messenger/Messenger";
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Signup from './containers/Auth/Signup/Signup';

class App extends Component {
  render() {
    let routes= (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Messenger} />
        <Redirect to="/" />
      </Switch>
    )
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default App;
