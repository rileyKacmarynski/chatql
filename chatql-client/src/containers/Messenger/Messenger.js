import React, { Component } from 'react';
import {Segment, Container, Header, Icon, Label, Feed } from 'semantic-ui-react';

import { getCurrentCredential } from '../../querys/auth-queries';
import { messages } from '../../querys/message-queries';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import MessageHeader from "../../components/Messages/MessageHeader";
import MessageWindow from '../../components/Messages/MessageWindow';
import MessageForm from './MessageForm';

export class Messenger extends Component {
  
  

  render() {

    return (
      <Container text style={{ marginTop: '2em' }}>
        <MessageHeader />
        <Segment.Group big raised >
          <MessageWindow messages={messages} />
          <MessageForm />
        </Segment.Group>
      </Container>
    )
  }
};

export default getCurrentCredential(Messenger);