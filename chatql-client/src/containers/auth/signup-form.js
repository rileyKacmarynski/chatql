import React, {Component} from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';

import {AUTH_TOKEN} from '../../constants';
import {currentCredentialQuery, withSignupMutation, checkUsernameQuery} from '../../querys/auth-queries';

export class SignupForm extends Component {
    state = {
        username: '',
        password: '',
        userLoading: false,
        signupLoading: false,
        userExists: false,
        usernameIcon: 'user',
    }
    
    checkUserName = debounce(async () => {
        this.setState({ userLoading: true});
        const { username } = this.state;

        const result = await this.props.client.query({
            query: checkUsernameQuery,
            variables: { username }
        });

        if(result.data.users.length > 0 ){
            this.setState({
                userExists: true, 
                userLoading: false, 
                usernameIcon: 'remove'
            });
        } else {
            this.setState({
                userLoading: false, 
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
        this.setState({ signupLoading: true });
        const {username, password } = this.state;

        let result;
        try{
            result = await this.props.signup({
                variables: {
                    username,
                    password,
                },
                update: this.saveUserDataToCache
            });
            
        } catch(e) {
            console.log(e);
            this.setState({ signupLoading: false });
            return;
        }
        const {token} = result.data.signup;
        this.setState({ signupLoading: false });
        this.props.history.push('/');
    }

    saveUserDataToCache = (proxy, {data}) => {
        if(data.signup){
            //write data back to the cache
            proxy.writeQuery({
                query: currentCredentialQuery,
                data: { ...data.signup }
            });
        }
    }

    render(){
        return (
            <Form size='large'>
                <Segment stacked>
                    <Form.Field>
                        <Form.Input
                            error={this.state.userExists}
                            loading={this.state.userLoading}
                            fluid
                            icon={this.state.usernameIcon}
                            iconPosition='left'
                            placeholder='Email Address'
                            onChange={(e) => this.handleUserOnChange(e)}
                        />
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
                        loading={this.state.signupLoading}
                        onClick={(e) => this.handleSignup(e)}
                    >Sign-up</Button>
                </Segment>
            </Form>
        )
    }
}


export default withSignupMutation(withRouter(withApollo(SignupForm)));