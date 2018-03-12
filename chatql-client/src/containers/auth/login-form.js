import React, { Component } from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import { loginWithData } from '../../querys/auth-queries';

class LoginForm extends Component{
    state = {
        username: '',
        password: '',
        loading: false,
        error: false
    }

    handleLogin = async (e) => {
        this.setState({loading: true});
        e.preventDefault();
        const { username, password } = this.state;

        const result = await this.props.submit(username, password);

        this.setState({loading: false});

        if(result.data.error || !result.data.login){
            console.log("unable to log in");
            this.setState({password: ''});
            return;
        }

        this.props.history.push('/');
    }

    render () {
        return (
            <Form size='large'>
                <Segment stacked>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        value={this.state.username}
                        onChange={(e) => this.setState({username: e.target.value})}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        value={this.state.password}
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

export default loginWithData()(withRouter(LoginForm));
