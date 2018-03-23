import React from 'react';
import ReactDOM from 'react-dom';
import './semantic/dist/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import * as constants from './constants';

const httpLink = new HttpLink({uri: constants.URI});

//registers middleware to set auth token request header
const middlewareAuthLink = new ApolloLink((operation, next) => {
    const token = localStorage.getItem(constants.AUTH_TOKEN);
    const authorizationHeader = token ? `Bearer ${token}` : null
    operation.setContext({
        headers: {
            Authorization: authorizationHeader
        }
    });
    return next(operation);
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

//creates web socket link
const wsLink = new WebSocketLink({
    uri: constants.WS_LINK,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(constants.AUTH_TOKEN)
        }
    }
});

//combines the two links
const link = split(
    ({ query }) => {
        const {kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLinkWithAuthToken,
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client} >
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
