const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Middleware for the environment variable - prevent sensitive information from being pushed
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Enabling introspection to allow Apollo Studio to query and fetch details about the GQL schema during development; introspection should be disabled on production build!
    introspection: true,
    context: authMiddleware,
    // context: ({ req }) => {
    //     const context = authMiddleware(req);
    //     return {
    //         user: context ? context.user : null
    //     };
    // }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If in production, serve client/build as static assets

    app.use(express.static(path.join(__dirname, '../client/build')));


if (process.env.NODE_ENV !== 'production') {
    // Serve the client development build for the React app
    app.use(express.static(path.join(__dirname, '../client/public')));
  }

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

//Create instance of Apollo server with GraphQL schema
const startApollo = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API initialized on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        });
    });
};

startApollo();
