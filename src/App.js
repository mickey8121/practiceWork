import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import Router from './routes/Router';

import client from './startup/apollo';

const App = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
);

export default App;
