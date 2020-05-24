import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';

import { useQuery } from '@apollo/react-hooks';

import TRANSACTIONS_QUERY from 'graphql/queries/transactions/transactions';

import Preloader from 'components/assets/Preloader';
import TransactionsList from 'components/transactions/TransactionsList';

import onError from 'helpers/onError';

const Transactions = ({ account, segmentedValue }) => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    loading,
    data,
    refetch
  } = useQuery(
    TRANSACTIONS_QUERY,
    {
      variables: { accountId: account?.id },
      onError,
      fetchPolicy: 'cache-and-network'
    }
  );
  const allTransactions = useMemo(() => data?.transactions || [], [data]);

  const [transactions, setTransactions] = useState(data?.transactions);

  useEffect(() => {
    if (segmentedValue === 'All') setTransactions(allTransactions);
    if (segmentedValue === 'Paid') {
      const currentTransactions = allTransactions.filter(t => t.amount < 0);
      setTransactions(currentTransactions);
    }
    if (segmentedValue === 'Received') {
      const currentTransactions = allTransactions.filter(t => t.amount > 0);
      setTransactions(currentTransactions);
    }
  }, [allTransactions, segmentedValue]);

  const refetchHandler = useCallback(
    () => {
      setRefreshing(true);
      refetch();
    },
    [refetch]
  );

  if (refreshing && !loading) setRefreshing(false);
  if (!data && loading) return <Preloader />;

  return (
    <TransactionsList
      targetAccount={account}
      currency={account?.currency}
      transactions={transactions}
      refetchHandler={refetchHandler}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
    />
  );
};

export default Transactions;
