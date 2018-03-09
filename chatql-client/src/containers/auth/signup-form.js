import React, {Component} from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';

import {AUTH_TOKEN} from '../../constants';
import { SignupWithData, checkUsernameQuery } from '../../querys/auth-queries';

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
        this.setState({loading: true});
        e.preventDefault();
        const { username, password } = this.state;

        const result = await this.props.submit(username, password);

        this.setState({loading: false});

        if(result.data.error || !result.data.signup){
            console.log("unable to sign-up");
            return;
        }

        this.props.history.push('/');
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
                            placeholder='Username'
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


export default SignupWithData(withRouter(withApollo(SignupForm)));