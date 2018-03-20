import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { getCurrentCredential } from './auth-queries';

const messageQuery = gql`
  query MessageQuery($take: Int) {
      messages(take: $take){
      id
      content
      timestamp
      sentBy{
        username
        id
      }
    }
  }
`

const messagesSubscription = gql`
  subscription{
    newMessage{
      id 
      content
      timestamp
      sentBy{
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
          updateQuery: (prev, {subscriptionData}) => {
            if(!subscriptionData.data.newMessage){
              return prev;
            }
            
            const newMessage =  {
              ...subscriptionData.data.newMessage,
              timestamp: new Date().toString()
            };
            const newMessages = [ ...prev.messages, newMessage ];

            return {
              ...prev,
              messages: newMessages
            }
          }
        })
      }
    }
  },
  options: ({ take }) => ({ variables: { take: 20 } }),
  name: 'messageQuery',
})


export const MessagesWithData = compose(
  getMessages,
  getCurrentCredential,
)


  // type Message {
  //   id: ID!
  //   content: String!
  //   timestamp: String
  //   sentBy: User
  // }