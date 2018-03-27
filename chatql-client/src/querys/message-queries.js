import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { getCurrentCredential } from "./auth-queries";

export const messageQuery = gql`
  query MessageQuery($take: Int) {
    messages(take: $take) {
      id
      content
      timestamp
      sentBy {
        username
        id
      }
    }
  }
`;

export const messagesSubscription = gql`
  subscription {
    newMessage {
      id
      content
      timestamp
      sentBy {
        username
        id
      }
    }
  }
`;

const getMessages = graphql(messageQuery, {
  props: props => {
    return {
      ...props,
      subcribeToNewMessages: params => {
        return props.messageQuery.subscribeToMore({
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
        });
      }
    };
  },
  options: ({ take }) => ({ variables: { take: 25 } }),
  name: "messageQuery"
});

export const createMessageMutation = gql`
  mutation createMessage($userId: ID!, $content: String!) {
    createMessage(userId: $userId, content: $content) {
      id
      content
      timestamp
      sentBy {
        username
        id
      }
    }
  }
`;

export const createMessage = graphql(createMessageMutation, {
  props: ({ mutate }) => ({
    submit: (userId, content) => 
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
      
      })   
  })
});

export const MessagesWithData = compose(
  getMessages, 
  getCurrentCredential,
  createMessage 
);

// type Message {
//   id: ID!
//   content: String!
//   timestamp: String
//   sentBy: User
// }
