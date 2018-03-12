import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { getCurrentCredential } from './auth-queries';

export const messages = [
  {
    id: 1,
    content: 'message 1',
    timestamp: new Date(),
    sentBy: {
      id: '11111',
      username: 'username1'
    }
  },
  {
    id: 2,
    content: 'message 2, but lets try a really long message. so that it wraps',
    timestamp: new Date(),
    sentBy: {
      id: '22222',
      username: 'username2'
    }
  },
  {
    id: 3,
    content: 'message 3, but lets try a really long message. so that it wraps',
    timestamp: new Date(),
    sentBy: {
      id: '11111',
      username: 'username1'
    }
  },
  {
    id: 4,
    content: 'message 4',
    timestamp: new Date(),
    sentBy: {
      id: '22222',
      username: 'username2'
    }
  }
]

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

export const MessagesWithData = compose(
  graphql(messageQuery, {
    options: ({ take }) => ({ variables: { take } }),
    name: 'messageQuery'
  }),
  getCurrentCredential
)


  // type Message {
  //   id: ID!
  //   content: String!
  //   timestamp: String
  //   sentBy: User
  // }