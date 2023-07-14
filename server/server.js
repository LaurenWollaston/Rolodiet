const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Middleware for the environment variable - prevent sensitive information from being pushed
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        user: authMiddleware(req).user
    })
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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
