import {
  ApolloClient,
  toIdValue,
} from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { createNetworkInterface } from 'apollo-upload-client'

import config from './config'

export default () => {
  const serverPort = `${config.api_host}:${config.api_port}`
  
  const networkInterface = createNetworkInterface({ uri: `http://${serverPort}/graphql` });
  /*networkInterface.use([{
    applyMiddleware(req, next) {
      setTimeout(next, 500);
    },
  }]);*/

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }

      // Get the authentication token from local storage if it exists
      const token = localStorage.getItem('auth-token');
      req.options.headers.Authorization = token ? 'Bearer '.concat(token) : null;
      next();
    }
  }]);

  const wsClient = new SubscriptionClient(`ws://${serverPort}/subscriptions`, {
    reconnect: true
  });

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  );

  function dataIdFromObject (result) {
    if (result.__typename) {
      if (result.id !== undefined) {
        return `${result.__typename}:${result.id}`;
      }
    }
    return null;
  }

  const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    customResolvers: {
      Query: {
        channel: (_, args) => {
          return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args['id'] }))
        },
      },
    },
    dataIdFromObject,
  });

  return client;
}
