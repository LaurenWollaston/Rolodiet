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

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    debug: true,
    context: ({ req }) => {
        console.log(`Received request with headers: ${JSON.stringify(req.headers)}`);
        const context = { user: authMiddleware(req).user };
        console.log(`Generated context: ${JSON.stringify(context)}`);
        return context;
    }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

//Create instance of Apollo server with GraphQL schema
const startApollo = async () => {
    await server.start();
    server.applyMiddleware({ app });

db.once('open', () => {
    console.log('Connected to database...')
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Server Error');
    });
    app.listen(PORT, () => {
        console.log(`API initialized on localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
});
};

startApollo();
