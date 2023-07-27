import { ApolloClient, InMemoryCache, createHttpLink, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Replace this with your GraphQL server endpoint

const httpLink = createHttpLink({
  uri: http://localhost:5000/,
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token) || ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
