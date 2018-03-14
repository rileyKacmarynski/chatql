import React, { Component } from 'react';
import {Segment, Container } from 'semantic-ui-react';

import { MessagesWithData } from '../../querys/message-queries';
import MessageHeader from "../../components/Messages/MessageHeader";
import MessageWindow from '../../components/Messages/MessageWindow';
import MessageForm from './MessageForm';

export class Messenger extends Component {
  
  

  render() {
    return (
      <Container text style={{ marginTop: '2em' }}>
        <MessageHeader />
        <Segment.Group big raised >
          <MessageWindow 
            user={this.props.getCurrentCredential.user}
            messages={this.props.messageQuery.messages} 
            loading={this.props.messageQuery.loading}/>
          <MessageForm loading={this.props.messageQuery.loading}/>
        </Segment.Group>
      </Container>
    )
  }
};

export default MessagesWithData(Messenger);