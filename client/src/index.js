import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'react-router-redux'

import MainRoutes, { history } from './routes'
import { UNAUTH_USER } from './actions/types'
import { me } from './actions/user';

import createApolloClient from './createApolloClient'
import configureStore from './configureStore'

import { setupAxiosInterceptors } from './middlewares/axiosInterceptors';

import './index.css';

const apolloClient = createApolloClient();

let initialState = {};

let token = localStorage.getItem('auth-token');
if (token) {
  initialState = {
    auth: {authenticated: true, token: token},
  };
}

const store = configureStore(apolloClient, initialState, history);

setupAxiosInterceptors(()=> {
  store.dispatch({ type: UNAUTH_USER });
  localStorage.removeItem('auth-token');
  history.push('/signin');
});

if (token) {
  // We need to update application state if the token exists
  store.dispatch(me());
}

ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient}>
    <ConnectedRouter history={history}>
      <div>
        <MainRoutes />
      </div>
    </ConnectedRouter>
  </ApolloProvider>
  , document.getElementById('root'))

