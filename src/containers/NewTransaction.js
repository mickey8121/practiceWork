import React, { useCallback } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import TRANSACTIONS_QUERY from 'graphql/queries/transactions/transactions';

import GET_RATE_QUERY from 'graphql/queries/currency/getRate';

import CREATE_TRANSACTION_MUTATION from 'graphql/mutations/transactions/createTransaction';

import NewTransactionModal from 'components/modalsContent/NewTransactionModal';

import onError from 'helpers/onError';
import getDataFromCache from 'helpers/getDataFromCache';
import getColorByString from 'helpers/getColorByString';

import useMe from 'hooks/useMe';
import useAccounts from 'hooks/useAccounts';

const NewTransaction = ({ targetAccount }) => {
  const navigation = useNavigation();
  const accounts = useAccounts();
  const me = useMe();

  const [
    loadRate,
    { loading: rateLoading, data: { getRate: rateToUsd } = {} }
  ] = useLazyQuery(GET_RATE_QUERY);

  const [createTransactionMutation] = useMutation(
    CREATE_TRANSACTION_MUTATION,
    {
      onError,
      update(cache, { data: { createTransaction } }) {
        // for AccountScreen and TransactionsTab
        [createTransaction.account.id, undefined].forEach(
          accountId => {
            const data = getDataFromCache(
              TRANSACTIONS_QUERY,
              { accountId }
            );

            const { transactions = [] } = data || {};

            cache.writeQuery({
              query: TRANSACTIONS_QUERY,
              variables: { accountId },
              data: { transactions: transactions.concat([createTransaction]) }
            });
          }
        );
      }
    }
  );

  const createHandler = useCallback((amount, account, description = '') => {
    const preparedAmount = amount?.length && amount?.replace(/,/g, '.');
    const parsedAmount = parseFloat(preparedAmount);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(parsedAmount)) {
      onError({ message: 'Wrong Amount' });
      return;
    }

    const fixedAmount = parseFloat(parsedAmount.toFixed(2));
    const currencyDivisor = rateLoading || !rateToUsd ? 1 : rateToUsd;

    const avatarColor = (
      getColorByString(`${account.id}${fixedAmount}${account.currency}`)
    );

    const createdAt = moment().format();

    createTransactionMutation({
      variables: { data: { amount: fixedAmount, description, accountId: account.id } },
      optimisticResponse: {
        __typename: 'Mutation',
        createTransaction: {
          __typename: 'Transaction',
          id: `Transaction:${account.balance}_optimisticResponse`,
          amount: fixedAmount,
          description,
          createdAt,
          account: {
            __typename: 'Account',
            ...account,
            balance: account.balance + fixedAmount,
            owner: {
              __typename: 'User',
              id: me.id,
              balance: me.balance + fixedAmount / currencyDivisor
            }
          },
          avatarColor
        }
      }
    });

    navigation.popToTop();
  }, [createTransactionMutation, me, rateLoading, rateToUsd, navigation]);

  return (
    <NewTransactionModal
      submitHandler={createHandler}
      loadRate={loadRate}
      accountsList={accounts}
      targetAccount={targetAccount}
    />
  );
};

export default NewTransaction;
