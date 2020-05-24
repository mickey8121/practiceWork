import gql from 'graphql-tag';

const SIGN_IN_MUTATION = gql`
  mutation signIn($data: SignInInput!) {
    signIn(data: $data) {
      token
      user {
        id
        name
        email
        balance
      }
    }
  }
`;

export default SIGN_IN_MUTATION;
