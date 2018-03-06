import React, { Component } from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';
import { graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import {AUTH_TOKEN} from '../../constants';

class LoginForm extends Component{
    state = {
        username: '',
        password: '',
        loading: false
    }

    handleLogin = async (e) => {
        this.setState({loading: true});
        e.preventDefault();
        const {username, password } = this.state;
        try{

            const result = await this.props.login({
                variables: {
                    username,
                    password,
                }
            });
            const {token} = result.data.login;
            this.setState({loading: false});    
            this.saveUserData(token);
            if(token != null){
                this.props.history.push('/');
            }
        }
        catch(e){
            console.log("Error Logging in.", e);
        }
    }

    saveUserData = token => localStorage.setItem(AUTH_TOKEN, token);

    render () {
        return (
            <Form size='large'>
                <Segment stacked>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Email Address'
                        onChange={(e) => this.setState({username: e.target.value})}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <Button loading={this.state.loading}
                        onClick={this.handleLogin} 
                        primary fluid size='large'
                    >Log-in</Button>
                </Segment>
            </Form>
          )
    }
}

const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){
    user {
        id
        username
    }
    token
  }
}
`

export default graphql(LOGIN, {name: 'login'})(withRouter(LoginForm));
