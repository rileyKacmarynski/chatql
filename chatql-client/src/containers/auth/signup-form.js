import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { ApolloConsumer, Mutation } from "react-apollo";
import debounce from "lodash/debounce";
import { withRouter } from "react-router-dom";

import {
  signupMutation,
  checkUsernameQuery,
  currentCredentialQuery
} from "../../querys/auth-queries";

import UsernameInput from "../../components/Auth/Signup/UsernameInput";
import * as constants from '../../constants';

export class SignupForm extends Component {
  state = {
    username: "",
    password: "",
    userLoading: false,
    signupLoading: false,
    userExists: false,
    usernameIcon: "user"
  };

  checkUserName = debounce(async client => {
    this.setState({ userLoading: true });
    const { username } = this.state;
    const result = await client.query({
      query: checkUsernameQuery,
      variables: { username }
    });

    if (result.data.users.length > 0) {
      this.setState({
        userExists: true,
        userLoading: false,
        usernameIcon: "remove"
      });
    } else {
      this.setState({
        userLoading: false,
        usernameIcon: "checkmark",
        userExists: false
      });
    }
  }, 750);

  handleUserOnChange = (e, client) => {
    this.setState({
      username: e.target.value,
      userExists: false
    });
    this.checkUserName(client);
  };

  handleSignup = async (e, signup) => {
    this.setState({ loading: true });
    e.preventDefault();
    const { username, password } = this.state;

    const result = await signup({
      variables: { username, password }
    });

    this.setState({ loading: false });

    if (result.data.error || !result.data.signup) {
      console.log("unable to sign-up");
      return;
    }

    this.props.history.push("/");
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={signupMutation}
            update={(cache, { data }) => {
              if (data.signup) {
                //write data back to the cache
                // cache.writeData({ data: { authPayload: data.Signup } });

                  cache.writeQuery({
                    query: currentCredentialQuery,
                    data: { ...data.signup }
                  });

                localStorage.setItem(constants.AUTH_TOKEN, data.signup.token);
              }
            }}
          >
          { signup => (
            <Form size="large">
              <Segment stacked>
                <Form.Field>
                  <UsernameInput
                    onChange={e => this.handleUserOnChange(e, client)}
                    userExists={this.state.userExists}
                    userLoading={this.state.userLoading}
                    usernameIcon={this.state.usernameIcon}
                  />
                </Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <Button
                  primary
                  fluid
                  size="large"
                  loading={this.state.signupLoading}
                  onClick={e => this.handleSignup(e, signup)}
                >
                  Sign-up
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

export default withRouter(SignupForm);
