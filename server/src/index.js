const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')

import { execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { apolloUploadExpress } from 'apollo-upload-server'
import { schema } from './schema';

const passport = require('passport');

require('dotenv').config();

const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost/auth'
mongoose.connect(mongoUri, {
  useMongoClient: true
})
console.log(mongoUri)

//app.use(morgan('combined'));
app.use(cors());
app.use(bodyparser.json())

router(app);

const requireAuth = passport.authenticate('jwt', {session: false});

app.use('/graphql', requireAuth,
  apolloUploadExpress({
    // Optional, defaults to OS temp directory
    // uploadDir: '/Users/tiansha/react/graphql-tutorial/uploads'
  }),
  graphqlExpress((req) => {
    return {
      schema,
      context: {
          user: req.user
      }
    }
  }
));

const PORT = process.env.SERVER_PORT || 3090;

app.use('/graphiql', requireAuth, graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: server,
    path: '/subscriptions',
  });
});

