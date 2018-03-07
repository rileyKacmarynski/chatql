import React, { Component } from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';
import { graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import {AUTH_TOKEN} from '../../constants';
import { currentCredentialQuery, login } from '../../querys/auth-queries';

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

        const result = await this.props.login({
            variables: {
                username,
                password,
            },
            update: this.saveUserDataToCache
        });
        this.setState({loading: false});    
        
        const {token} = result.data.login;
        if(result.data.error){
            console.log("Error loggin in");
            return;
        }
        
        this.props.history.push('/');
    }

    saveUserDataToCache = (proxy, {data}) => {
        if(data.login){
            //write data back to the cache
            proxy.writeQuery({
                query: currentCredentialQuery,
                data: { ...data.login }
            });
        }
    }

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

export default login(withRouter(LoginForm));
