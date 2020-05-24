import gql from 'graphql-tag';

const SIGN_UP_MUTATION = gql`
  mutation signUp($data: SignUpInput!) {
    signUp(data: $data) {
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

export default SIGN_UP_MUTATION;
