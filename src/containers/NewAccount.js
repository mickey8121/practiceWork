import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useMutation } from '@apollo/react-hooks';

import ACCOUNTS_QUERY from 'graphql/queries/accounts/accounts';

import CREATE_ACCOUNT_MUTATION from 'graphql/mutations/accounts/createAccount';

import getColorByString from 'helpers/getColorByString';

import NewAccountModal from 'components/modalsContent/NewAccountModal';

import onError from 'helpers/onError';
import getDataFromCache from 'helpers/getDataFromCache';

const NewAccount = () => {
  const navigation = useNavigation();

  const [createAccountMutation] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onError,
      update(cache, { data: { createAccount } }) {
        const data = getDataFromCache(ACCOUNTS_QUERY);
        const { accounts = [] } = data || {};

        cache.writeQuery({
          query: ACCOUNTS_QUERY,
          data: { accounts: accounts.concat([createAccount]) },
        });
      }
    }
  );

  const submitHandler = useCallback((name, currency) => {
    const avatarColor = getColorByString(`${currency}${name}`);

    createAccountMutation({
      variables: { data: { name, currency } },
      optimisticResponse: {
        __typename: 'Mutation',
        createAccount: {
          __typename: 'Account',
          id: `Account:${name}_optimisticResponse`,
          name,
          currency,
          balance: 0,
          avatarColor,
          avatarSymbol: name[0]
        }
      }
    });

    navigation.popToTop();
  }, [createAccountMutation, navigation]);

  return (
    <NewAccountModal submitHandler={submitHandler} />
  );
};

export default NewAccount;
