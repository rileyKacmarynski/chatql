import React, {Component} from 'react';
import {Form, Segment, Button, Label, Portal } from 'semantic-ui-react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';

import {AUTH_TOKEN} from '../../../constants';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        userExists: false,
        usernameIcon: 'user',
    }
    
    checkUserName = debounce(async () => {
        this.setState({ loading: true});
        const { username } = this.state;

        const result = await this.props.client.query({
            query: EXISTING_USERNAME,
            variables: { username }
        });

        if(result.data.users.length > 0 ){
            this.setState({
                userExists: true, 
                loading: false, 
                usernameIcon: 'remove'
            });
        } else {
            this.setState({
                loading: false, 
                usernameIcon: 'checkmark',
                userExists: false,
            })
        }
    }, 750)

    handleUserOnChange = (e) => {
        this.setState({username: e.target.value});
        this.checkUserName();
    }

    handleSignup = async (e) => {
        e.preventDefault();
        const {username, password } = this.state;
        const result = await this.props.signup({
            variables: {
                username,
                password,
            }
        });
        const {token} = result.data.signup;
        this.saveUserData(token);
        console.log(this.props);
        this.props.history.push('/');
    }

    saveUserData = token => localStorage.setItem(AUTH_TOKEN, token);

    render(){
        const errorLabel = this.state.userExists &&
            <Label basic color='red' pointing='above'>
                Username taken
            </Label>
        
        
        return (
            <Form size='large'>
                <Segment stacked>
                    <Form.Field>
                        <Form.Input
                            error={this.state.userExists}
                            loading={this.state.loading}
                            fluid
                            icon={this.state.usernameIcon}
                            iconPosition='left'
                            placeholder='Email Address'
                            onChange={(e) => this.handleUserOnChange(e)}
                        />
                        {errorLabel}
                    </Form.Field>
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                    <Button primary fluid size='large'
                        onClick={(e) => this.handleSignup(e)}
                    >Sign-up</Button>
                </Segment>
            </Form>
        )
    }
}

const EXISTING_USERNAME = gql`
query users($username: String){
    users(username: $username){
        username
    }   
}
`;

const SIGNUP = gql`
mutation signup($username: String!, $password: String!){
  signup(username: $username, password: $password){
    token
  }
}
`

export default graphql(SIGNUP, {name: 'signup'})(withRouter(withApollo(LoginForm)));