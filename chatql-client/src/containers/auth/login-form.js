import React, { Component } from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';


class LoginForm extends Component{
    state = {
        username: '',
        password: '',
        error: false
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
                    <Button primary fluid size='large'>Log-in</Button>
                </Segment>
            </Form>
          )
    }
}

export default LoginForm;
