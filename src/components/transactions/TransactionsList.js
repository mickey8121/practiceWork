import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  RefreshControl
} from 'react-native';
import moment from 'moment';

import sectioningDataByDate from 'helpers/sectioningDataByDate';

import colors from 'styles/colors';

import TransactionItem from './TransactionItem';

const currentYear = moment().get('year');
const today = moment().format('DD MMM YYYY');

const getCurrentTitle = title => {
  if (title === today) return 'Today';

  const titleYear = moment(title).get('year');
  return titleYear === currentYear ? moment(title).format('DD. MMMM') : title;
};

const ListEmptyComponent = () => (
  <View style={styles.emptyComponent}>
    <Text style={styles.notFoundText}>Transactions not found</Text>
  </View>
);

const TransactionsList = ({
  transactions,
  currency,
  refetchHandler,
  refreshing
}) => {
  const renderItem = useCallback(
    ({ item }) => <TransactionItem transaction={item} currency={currency} />,
    [currency],
  );

  const sectionedData = useMemo(
    () => sectioningDataByDate(transactions),
    [transactions]
  );

  return (
    <View style={styles.transactionsContainer}>
      <SectionList
        ListEmptyComponent={<ListEmptyComponent />}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        sections={sectionedData}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{getCurrentTitle(title)}</Text>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetchHandler}
            tintColor={colors.primaryLight}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsContainer: {
    height: '100%'
  },
  emptyComponent: {
    paddingTop: 50,
    alignSelf: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: colors.primaryLight
  },
  sectionHeader: {
    height: 48,
    paddingBottom: 4,
    justifyContent: 'flex-end',
    backgroundColor: colors.primary
  },
  sectionTitle: {
    fontSize: 12,
    color: '#8492A2'
  }
});

export default TransactionsList;
