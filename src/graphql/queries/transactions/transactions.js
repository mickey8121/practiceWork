import gql from 'graphql-tag';

const TRANSACTIONS_QUERY = gql`
  query transactions($accountId: ID) {
    transactions(accountId: $accountId) {
      id
      description
      amount
      createdAt
      account {
        id
        name
        balance
        currency
        owner {
          id
          balance
        }
      }
      avatarColor @client
    }
  }
`;

export default TRANSACTIONS_QUERY;
