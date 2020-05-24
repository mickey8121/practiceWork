import React, {
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import { isAndroid } from 'helpers/platformData';

import Transactions from 'containers/Transactions';

const TransactionsScreen = ({ navigation }) => {
  const segmentedValues = useMemo(() => ['All', 'Paid', 'Received'], []);
  const [segmentedValue, setSegmentedValue] = useState('All');

  const selectedIndex = useMemo(
    () => segmentedValues.findIndex(v => v === segmentedValue),
    [segmentedValues, segmentedValue]
  );

  const onValueChange = useCallback(
    value => setSegmentedValue(value),
    [],
  );

  const headerTitle = useCallback(
    () => (
      <View style={isAndroid
        ? {
          position: 'absolute',
          left: wp(-18) - 1,
          width: wp(100),
          paddingHorizontal,
          paddingBottom: 10
        } : {}}
      >
        <SegmentedControl
          values={segmentedValues}
          selectedIndex={selectedIndex}
          onValueChange={onValueChange}
        />
      </View>
    ),
    [onValueChange, segmentedValues, selectedIndex],
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle });
  }, [navigation, headerTitle]);

  return (
    <View style={styles.page}>
      <Transactions segmentedValue={segmentedValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    paddingHorizontal,
    backgroundColor: colors.primary
  }
});

export default TransactionsScreen;
