import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import useAccounts from 'hooks/useAccounts';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import onError from 'helpers/onError';

import TransactionsScreen from 'screens/TransactionsScreen';

import AddBtn from 'components/assets/AddBtn';

import NewTransactionRoute from '../modals/NewTransactionRoute';

const { Navigator, Screen } = createStackNavigator();

const headerLeft = () => (
  <Text
    style={{
      position: 'absolute',
      left: 16,
      bottom: 60,
      fontFamily: 'WorkSans-Regular',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 28
    }}
  >
    Transactions
  </Text>
);

const TransactionsTab = ({ navigation }) => {
  const accounts = useAccounts();

  const onPress = useCallback(
    () => (
      accounts?.length ? navigation.navigate('NewTransaction')
        : onError({ title: 'No Accounts', message: 'First create an account' })),
    [accounts, navigation]
  );

  const headerRight = useCallback(() => (
    <AddBtn
      style={{ position: 'absolute', bottom: 51, right: 16 }}
      addBtnOptions={[{ onPress }]}
    />
  ), [onPress]);

  return (
    <Navigator mode='modal'>
      <Screen
        name='Transactions'
        options={{
          headerTitleContainerStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            paddingBottom: 10,
            paddingHorizontal
          },
          headerStyle: {
            height: hp(22.66),
            borderWidth: 1,
            borderColor: colors.borderOnPrimary,
            backgroundColor: colors.primary,
            shadowColor: 'transparent',
            elevation: 0
          },
          headerLeft,
          headerRight: () => headerRight(navigation)
        }}
        component={TransactionsScreen}
      />

      {/* modal  */}
      {NewTransactionRoute()}
    </Navigator>
  );
};

export default TransactionsTab;
