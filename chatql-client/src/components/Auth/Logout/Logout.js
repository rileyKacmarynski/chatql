import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';

import { currentCredentialQuery } from '../../../querys/auth-queries';


export class Logout extends Component {

  async componentDidMount(){
    const {client} = this.props;

    client.writeQuery({
      query: currentCredentialQuery,
      data: {
        user: {
          username: '',
          id: '',
          __typename: 'User'
        },
        token: '',
        __typename: 'AuthPayload'
      }
    });
  }
  
  render(props) {
    return this.props.loading ? <Loader />
      : <Redirect to="/" />
  }
};

export default withApollo(Logout);