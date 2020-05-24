import gql from 'graphql-tag';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($data: AccountCreateInput!) {
    createAccount(data: $data) {
      id
      name
      currency
      balance
      avatarColor @client
      avatarSymbol @client
    }
  }
`;

export default CREATE_ACCOUNT_MUTATION;
