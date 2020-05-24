import { useQuery } from '@apollo/react-hooks';
import ACCOUNTS_QUERY from 'graphql/queries/accounts/accounts';

const useAccounts = (fetchPolicy = 'cache-only') => {
  const { data: { accounts = [] } = {} } = useQuery(ACCOUNTS_QUERY, { fetchPolicy });

  return accounts;
};

export default useAccounts;
