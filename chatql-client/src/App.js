import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Query, withApollo } from "react-apollo";

import Layout from "./containers/Layout/Layout";
import MessengerWithData from "./containers/Messenger/MessengerWithData";
import Logout from "./components/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent";
import { getCurrentCredential } from "./querys/auth-queries";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";



class App extends Component {
  render() {
    const { token } = this.props.getCurrentCredential
    let routes= (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={Logout} />        
        <Route path="/" exact render={() => <MessengerWithData take={25}/>} />
        <Redirect to="/" />
      </Switch>
    )
    let user;
    if(token && token !== ""){
      user = this.props.getCurrentCredential.user;
      
        routes = (
          <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact render={() => <MessengerWithData user={user} take={25}/>} />
          <Redirect to="/" />
        </Switch>
        ) 
    }
    return (
      <Layout user={user}>
        {routes}
      </Layout>
    );
  }
}

export default getCurrentCredential(withApollo(App));



// <Query query={currentCredentialQuery}>
// {( data ) => {

//   if (data) {
//     debugger;
//     return (
//       <Switch>
//         <Route path="/login" component={Login} />
//         <Route path="/signup" component={Signup} />
//         <Route path="/logout" component={Logout} />
//         <Route
//           path="/"
//           exact
//           render={() => (
//             <MessengerWithData user={data} take={25} />
//           )}
//         />
//         <Redirect to="/" />
//       </Switch>
//     );
//   } else {
//     return (
//       <Switch>
//         <Route path="/login" component={Login} />
//         <Route path="/signup" component={Signup} />
//         <Route path="/logout" component={Logout} />
//         <Route
//           path="/"
//           exact
//           render={() => <MessengerWithData user={null} take={25} />}
//         />
//         <Redirect to="/" />
//       </Switch>
//     );
//   }
// }}
// </Query>