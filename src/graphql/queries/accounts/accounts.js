import gql from 'graphql-tag';

const ACCOUNTS_QUERY = gql`
  query accounts {
    accounts {
      id
      name
      currency
      balance
      avatarColor @client
      avatarSymbol @client
    }
  }
`;

export default ACCOUNTS_QUERY;
