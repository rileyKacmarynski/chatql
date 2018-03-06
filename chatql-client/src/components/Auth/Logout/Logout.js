import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { AUTH_TOKEN } from '../../../constants';

export class Logout extends Component {

  async componentDidMount(){
    localStorage.removeItem(AUTH_TOKEN);
    try {
      await this.props.client.resetStore();
    } catch(e) {
      //we don't actually want to let them know
      //we couldn't reset the store YOLO
    }
  }
  
  render(props) {
    return this.props.loading ? <Loader />
      : <Redirect to="/" />
  }
};

export default Logout;