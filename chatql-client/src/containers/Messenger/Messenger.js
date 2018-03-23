import React, { Component } from 'react';
import {Segment, Container } from 'semantic-ui-react';

import { MessagesWithData } from '../../querys/message-queries';
import MessageHeader from "../../components/Messages/MessageHeader";
import MessageWindow from '../../components/Messages/MessageWindow';
import MessageForm from './MessageForm';

export class Messenger extends Component {
  
  componentWillReceiveProps(newProps){
    if(!newProps.messageQuery.loading){
      if(this.unsubscribe){
        this.unsubscribe();
      }
      this.unsubscribe = newProps.subcribeToNewMessages({
        room: ''
      });
    }
  }

  render() {
    return (
      <Container text style={{ marginTop: '2em' }}>
        <MessageHeader />
        <Segment.Group big raised >
          <MessageWindow 
          user={this.props.getCurrentCredential.user}
          messages={this.props.messageQuery.messages} 
            loading={this.props.messageQuery.loading}/>
          <MessageForm 
            createMessage={this.props.submit}
            loading={this.props.messageQuery.loading}
            user={this.props.getCurrentCredential.user}/>
        </Segment.Group>
      </Container>
    )
  }
};

export default MessagesWithData(Messenger);