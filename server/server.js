require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('./config/connection');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// If in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//Start Apollo Server after connecting to MongoDB
const startApollo = async () => {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    mongoose.connection.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API initialized on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        });
    });
};

startApollo();
