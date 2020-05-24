import gql from 'graphql-tag';

const ME_QUERY = gql`
  query me {
    me  {
      id
      name
      email
      balance
    }
  }
`;

export default ME_QUERY;
