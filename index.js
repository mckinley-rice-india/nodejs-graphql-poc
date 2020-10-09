const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' });
const {
  ApolloServer,
  AuthenticationError,
} = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const models = require('./src/models');

let server = new ApolloServer({
  typeDefs: require('./src/graphql/schemas'),
  resolvers: require('./src/graphql/resolvers'),
  formatError: (error) => {
    let message = error.message || 'Unexpected error';
    if (error.message.startsWith('Validation error')) {
      message = 'Validation error';
      error = JSON.parse(
        error.message.replace('Validation error', ''),
      );
    }

    return {
      code: error.statusCode || 400,
      message,
      error,
    };
  },
  context: async ({ req }) => {
    let user = null;
    if (req.headers.authorization) {
      const token = req.headers['authorization'];
      if (token) {
        user = jwt.verify(
          token.replace(/bearer /i, ''),
          process.env.SECRET,
        );
        if (!user) throw new AuthenticationError('Session Expired');
      }
    }
    return { models, user, secret: process.env.SECRET };
  },
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(
    `server up on 4000 http://localhost:4000${server.graphqlPath}`,
  );
});
