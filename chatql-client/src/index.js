import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import * as constants from './constants';

const httpLink = new HttpLink({uri: appSettings.URI});

const middlewareAuthLink = new ApolloLink((operation, next) => {
    const token = localStorage.getItem(constants.AUTH_TOKEN);
    const authorizationHeader = token ? `Bearer ${token}` : null
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    });
    return next(operation);
})


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
