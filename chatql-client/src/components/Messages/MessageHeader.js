import React from 'react';
import {Header, Icon } from 'semantic-ui-react';

const MessageHeader = () => {
  return (
    <Header as='h2'>
    <Icon name='mail out' color='pink' />
    <Header.Content>
      Messages
      <Header.Subheader>
        realtime chatroom using React and GraphQL.
      </Header.Subheader>
    </Header.Content>
  </Header> 
  )
};

export default MessageHeader;
