import gql from 'graphql-tag';

const GET_RATE_QUERY = gql`
  query getRate($from: Currency!) {
    getRate(from: $from)
  }
`;

export default GET_RATE_QUERY;
