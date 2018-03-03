import React from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const AuthForm = (props) => {
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
            <Button primary fluid size='large'>{props.buttonText}</Button>
        </Segment>
    </Form>
  )
};

export default AuthForm;
