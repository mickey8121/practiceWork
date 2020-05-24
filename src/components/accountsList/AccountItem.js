import React, { useCallback, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import colors from 'styles/colors';

import amountСonversion from 'utils/amountСonversion';

import Avatar from 'components/assets/Avatar';

const AccountItem = ({ acc, pressHandler }) => {
  const {
    id,
    name,
    balance,
    currency,
    avatarColor,
    avatarSymbol
  } = acc;

  const preparedBalance = useMemo(
    () => amountСonversion(balance, currency),
    [balance, currency]
  );

  const balanceColor = useMemo(
    () => (balance < 0 ? colors.negativeRed : colors.defaultColor),
    [balance]
  );

  const onPress = useCallback(
    () => pressHandler(acc, avatarColor),
    [acc, avatarColor, pressHandler]
  );

  return (
    <TouchableOpacity
      key={id}
      activeOpacity={0.5}
      style={styles.account}
      onPress={onPress}
    >
      <Avatar
        color={avatarColor}
        symbol={avatarSymbol}
        style={{ marginRight: 15 }}
      />

      <Text numberOfLines={1} style={styles.accountName}>{name}</Text>
      <View style={{ marginLeft: 'auto' }}>
        <Text numberOfLines={1} style={{ ...styles.accountBalance, color: balanceColor }}>
          {preparedBalance}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  account: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 69,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  accountName: {
    flexBasis: '50%',
    flexShrink: 1,
    fontSize: 18,
    fontFamily: 'SFProText-Regular'
  },
  accountBalance: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontFamily: 'SFProText-Regular',
    marginLeft: 'auto'
  }
});

export default React.memo(AccountItem);
