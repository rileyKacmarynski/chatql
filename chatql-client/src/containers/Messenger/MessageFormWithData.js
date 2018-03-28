import React, { Component } from "react";

import { Mutation } from "react-apollo";

import { createMessageMutation } from '../../querys/message-queries';
import MessageForm from './MessageForm';

export class MessageFormWithData extends Component {
  render() {
    return (
      <Mutation mutation={createMessageMutation}>
        { mutate => (
          <MessageForm {...this.props} 
            sendMessage={( userId, content ) => {
              mutate({ 
                variables: { userId, content },
                optimisticResponse: {
                  __typename: "Mutation",
                  createMessage: {
                    id: "temp",
                    content: content,
                    timestamp: '',
                    sentBy: {
                      username: "sending",
                      id: userId,
                      __typename: "User"
                    },
                    __typename: "Message"
                  }
                }
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default MessageFormWithData;
