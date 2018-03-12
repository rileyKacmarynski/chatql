import React, { Component } from 'react';
import { Segment, Form, TextArea, Icon, Button } from 'semantic-ui-react';

export class MessageForm extends Component {
  render() {
    return (
      //remember to also disable if the user in not logged in
      <Segment disabled={this.props.loading} color='pink' style={{height: '15vh'}} >
        <Form>
          <TextArea style={{resize: 'none'}} />
          <Button color='pink' basic animated style={{float: 'right', marginTop: '7px'}} >
          <Button.Content visible>Send</Button.Content>
          <Button.Content hidden>
            <Icon name='send' color='pink' />
          </Button.Content>
        </Button>
        </Form>
      </Segment>
    )
  }
};

export default MessageForm;
