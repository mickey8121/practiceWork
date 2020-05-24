import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import amountСonversion from 'utils/amountСonversion';

import colors from 'styles/colors';

import Avatar from 'components/assets/Avatar';

const currentYear = moment().get('year');

const getTransactionTime = date => {
  const isCurrentYear = moment(date).get('year') === currentYear;

  return (
    isCurrentYear ? moment(date).format('hh:mma')
      : moment(date).format('DD. MMMM hh:mma')
  );
};

const TransactionsItem = ({
  transaction: {
    id,
    amount,
    avatarColor,
    account,
    createdAt
  },
  currency
}) => {
  const preparedAmount = useMemo(
    () => amountСonversion(amount, currency || account.currency),
    [amount, currency, account]
  );

  const transactionTitle = useMemo(
    () => getTransactionTime(createdAt),
    [createdAt]
  );

  const balanceColor = useMemo(
    () => (amount < 0 ? colors.negativeRed : colors.defaultColor),
    [amount]
  );

  const transactionStatus = useMemo(
    () => (
      currency ? (amount < 0 ? 'Paid' : amount > 0 ? 'Received' : '')
        : account.name
    ),
    [currency, amount, account]
  );

  return (
    <View
      key={id}
      activeOpacity={0.5}
      style={styles.transaction}
    >
      <Avatar
        color={avatarColor}
        symbol='n'
        style={{ marginRight: 15 }}
      />

      <View>
        <Text style={styles.transactionTitle}>{transactionTitle}</Text>
        <Text style={styles.transactionStatus}>{transactionStatus}</Text>
      </View>
      <Text style={{ ...styles.transactionBalance, color: balanceColor }}>
        {preparedAmount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 69,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  transactionTitle: {
    fontSize: 18,
    fontFamily: 'SFProText-Regular'
  },
  transactionStatus: {
    marginTop: 3,
    marginBottom: 2,
    fontSize: 12,
    fontFamily: 'SFProText-Regular',
    color: '#8492a2'
  },
  transactionBalance: {
    alignSelf: 'flex-start',
    marginTop: 15,
    fontSize: 18,
    fontFamily: 'SFProText-Regular',
    marginLeft: 'auto'
  }
});

export default React.memo(TransactionsItem);
