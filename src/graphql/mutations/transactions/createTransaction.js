import gql from 'graphql-tag';

const CREATE_TRANSACTION_MUTATION = gql`
  mutation createTransaction($data: TransactionCreateInput!) {
    createTransaction(data: $data) {
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

export default CREATE_TRANSACTION_MUTATION;
