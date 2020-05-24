import React, { useState, useCallback } from 'react';

import { useQuery } from '@apollo/react-hooks';

import ACCOUNTS_QUERY from 'graphql/queries/accounts/accounts';

import Preloader from 'components/assets/Preloader';
import AccountsList from 'components/accountsList/AccountsList';

import onError from 'helpers/onError';

const Accounts = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    loading,
    data = {},
    refetch
  } = useQuery(
    ACCOUNTS_QUERY,
    { onError }
  );

  const refetchHandler = useCallback(
    () => {
      setRefreshing(true);
      refetch().finally(() => setRefreshing(false));
    },
    [refetch]
  );

  if (loading && !refreshing) return <Preloader />;

  return (
    <AccountsList
      accounts={data?.accounts}
      refetchHandler={refetchHandler}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
    />
  );
};

export default Accounts;
