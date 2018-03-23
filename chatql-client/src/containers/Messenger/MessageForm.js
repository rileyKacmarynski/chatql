import React, { Component } from 'react';
import { Segment, Form, TextArea, Icon, Button } from 'semantic-ui-react';

export class MessageForm extends Component {
  state = {
    message: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { message } = this.state;
    this.setState({ message: '' });
    const result = await this.props.createMessage(this.props.user.id, message);
  }

  render() {

    const authorized = this.props.user != null;
    const textColor = authorized ? 'black' : '#777';
    return (
      //remember to also disable if the user in not logged in
      <Segment disabled={this.props.loading} color='pink' style={{height: '15vh'}} >
        <Form>
          <TextArea 
            disabled={!authorized}
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            style={{resize: 'none', color: textColor }} />
          {!authorized && <span style={{fontSize: '12px', color: '#888'}} >Please login or signup to send a message.</span>}
          <Button 
            onClick={e => this.handleSubmit(e)}
            color='pink' basic animated 
            style={{float: 'right', marginTop: '7px'}} 
            disabled={!authorized}
          >
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
