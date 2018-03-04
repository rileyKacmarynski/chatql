import React from 'react';
import {Form, Segment, Button } from 'semantic-ui-react';

const LoginForm = () => {
  return (
    <Form size='large'>
        <Segment stacked>
            <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Email Address'
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
            />
            <Button primary fluid size='large'>Log-in</Button>
        </Segment>
    </Form>
  )
};

export default LoginForm;
