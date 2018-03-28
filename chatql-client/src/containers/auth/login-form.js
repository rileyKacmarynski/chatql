import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Mutation, ApolloConsumer } from "react-apollo";

import {
  loginMutation,
  currentCredentialQuery
} from "../../querys/auth-queries";
import * as constants from "../../constants";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    error: false
  };

  handleLogin = async (e, login) => {
    this.setState({ loading: true });
    e.preventDefault();
    const { username, password } = this.state;

    const result = await login({
      variables: { username, password }
    });

    this.setState({ loading: false });

    if (result.data.error || !result.data.login) {
      console.log("unable to log in");
      this.setState({ password: "" });
      return;
    }

    this.props.history.push("/");
  };

  render() {
    return (
      <ApolloConsumer>
        {cache => (
          <Mutation
            mutation={loginMutation}
            update={(cache, { data }) => {
              if (data.login) {
                // cache.writeData({ data: { authPayload: data.login } });
              
                cache.writeQuery({
                  query: currentCredentialQuery,
                  data: { ...data.login }
                });

                localStorage.setItem(constants.AUTH_TOKEN, data.login.token);
              }
            }}
          >
            {login => (
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <Button
                    loading={this.state.loading}
                    onClick={e => this.handleLogin(e, login)}
                    primary
                    fluid
                    size="large"
                  >
                    Log-in
                  </Button>
                </Segment>
              </Form>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(LoginForm);
