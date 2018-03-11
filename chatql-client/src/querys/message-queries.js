import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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


  // type Message {
  //   id: ID!
  //   content: String!
  //   timestamp: String
  //   sentBy: User
  // }