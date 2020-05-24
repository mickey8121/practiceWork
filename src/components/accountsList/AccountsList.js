import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from 'styles/colors';

import AccountItem from './AccountItem';

const Accounts = ({
  accounts,
  // = [ // fake
  //   {
  //     id: '1', name: 'test', balance: 300, currency: 'USD'
  //   },
  //   {
  //     id: '2', name: 'test', balance: 300, currency: 'EUR'
  //   },
  //   {
  //     id: '3', name: 'test', balance: 300, currency: 'USD'
  //   },
  //   {
  //     id: '4', name: 'test', balance: 300, currency: 'RUB'
  //   },
  //   {
  //     id: '5', name: 'test', balance: 300, currency: 'CNY'
  //   },
  // ],
  refetchHandler,
  refreshing
}) => {
  const { navigate } = useNavigation();

  const handlePress = useCallback(
    (account, avatarColor) => navigate('Account', { account, avatarColor }),
    [navigate],
  );

  const renderItem = useCallback(
    ({ item }) => <AccountItem acc={item} pressHandler={handlePress} />,
    [handlePress]
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.accountList}
        data={accounts}
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetchHandler}
            tintColor={colors.primaryLight}
            style={{ backgroundColor: colors.primary }}
          />
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  accountList: {
    paddingTop: 17,
    paddingBottom: 30
  }
});

export default Accounts;
