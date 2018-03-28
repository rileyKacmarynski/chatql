import React, { Component } from 'react';
import {Segment, Container } from 'semantic-ui-react';
import { Query } from 'react-apollo';

import { MessagesWithData, messageQuery, messagesSubscription } from '../../querys/message-queries';
// import MessageHeader from "../../components/Messages/MessageHeader";
// import MessageWindow from '../../components/Messages/MessageWindow';
// import MessageForm from './MessageForm';
import Messenger from '../../components/Messages/Messenger';


export class MessengerWithData extends Component {
  
  render() {
    return (
      <Query 
        query={messageQuery}
        variables={{ take: this.props.take }}
      >
        { ({ subscribeToMore, ...result }) => (
          <Messenger 
            {...result}
            user={this.props.user}
            subscribeToNewMessages = {() => 
              subscribeToMore({
                document: messagesSubscription,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data.newMessage) {
                    return prev;
                  }
      
                  const newMessage = {
                    ...subscriptionData.data.newMessage,
                    timestamp: new Date().toString()
                  };
                  const newMessages = [...prev.messages, newMessage];
      
                  return {
                    ...prev,
                    messages: newMessages
                  };
                }
              })
            }
          />
        )}
      </Query>

      // <Container text style={{ marginTop: '2em' }}>
      //   <MessageHeader />
      //   <Segment.Group big raised >
      //     <MessageWindow 
      //     user={this.props.getCurrentCredential.user}
      //     messages={this.props.messageQuery.messages} 
      //       loading={this.props.messageQuery.loading}/>
      //     <MessageForm 
      //       createMessage={this.props.submit}
      //       loading={this.props.messageQuery.loading}
      //       user={this.props.getCurrentCredential.user}/>
      //   </Segment.Group>
      // </Container>
    )
  }
};

export default MessengerWithData;