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
