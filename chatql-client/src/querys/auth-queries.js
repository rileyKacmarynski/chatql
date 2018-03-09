import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

import * as constants from '../constants';

export const currentCredentialQuery = gql(
    `
    query CurrentCredentialQuery {
            user {
                id
                username
            }
            token  
    }
    `
);

// will only be ran on the in-memory cache on the client
export const getCurrentCredential = graphql(currentCredentialQuery, {
    name: 'getCurrentCredential'
    , options: {
        fetchPolicy: 'cache-only'
    }
});

export const loginMutation = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){
    user {
        id
        username
    }
    token
  }
}
`

export const loginWithData = () => graphql(loginMutation, {
    props: ({mutate}) => ({
        submit: (username, password) => 
            mutate({ variables: { username, password}}),
    }),
    options: {
        update: saveLoginToCache
    }
});

const saveLoginToCache = (proxy, {data}) => {
    if(data.login){
        //write data back to the cache
        proxy.writeQuery({
            query: currentCredentialQuery,
            data: { ...data.login }
        });
        localStorage.setItem(constants.AUTH_TOKEN, data.login.token);
    }
}

export const checkUsernameQuery = gql`
query users($username: String){
    users(username: $username){
        username
    }   
}
`

const signupMutation = gql`
mutation signup($username: String!, $password: String!){
  signup(username: $username, password: $password){
    user {
        id
        username
    }
    token
  }
}
`

export const SignupWithData = graphql(signupMutation, {
    props: ({ mutate }) => ({
        submit: (username, password) => 
            mutate({ variables: { username, password}}),
    }),
    options: {
        update: saveSignupToCache
    }
})

const saveSignupToCache = (proxy, {data}) => {
    if(data.Signup){
        //write data back to the cache
        proxy.writeQuery({
            query: currentCredentialQuery,
            data: { ...data.Signup }
        });
        localStorage.setItem(constants.AUTH_TOKEN, data.login.token);        
    }
}