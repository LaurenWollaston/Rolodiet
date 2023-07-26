import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from '@apollo/client';

// Replace this with your GraphQL server endpoint
const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // Set the authorization header here if needed
  // Example: 
  // const token = localStorage.getItem('token');
  // operation.setContext({
  //   headers: {
  //     authorization: token ? `Bearer ${token}` : '',
  //   },
  // });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
