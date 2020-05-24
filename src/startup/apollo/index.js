import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { getToken } from 'utils/tokenControl';

import resolvers from './resolvers';

const API_URL = 'https://fujix-demo-finances-api.herokuapp.com';

export const cache = new InMemoryCache({});
const httpLink = createHttpLink({ uri: API_URL });

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers
});

export default client;
