import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import { isAndroid } from 'helpers/platformData';

import Transactions from 'containers/Transactions';

import Avatar from 'components/assets/Avatar';

const HeaderLeft = ({ name = '', avatarColor }) => (
  <View
    style={{
      position: 'absolute',
      top: '100%',
      marginTop: isAndroid ? -61 : -47,
      height: isAndroid ? 61 : 47,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal,
      width: Dimensions.get('screen').width - 50
    }}
  >
    <Avatar
      short
      style={{ marginRight: 10 }}
      symbol={name[0]}
      color={avatarColor}
    />

    <View style={{ height: 37 }}>
      <Text
        style={{
          fontFamily: 'WorkSans-Bold',
          fontWeight: 'bold',
          fontSize: 20,
          lineHeight: 37
        }}
      >
        {name}
      </Text>
    </View>
  </View>
);

const AccountScreen = ({ navigation, route: { params = {} } }) => {
  const { account, avatarColor } = params;
  const { name } = account || {};

  const headerLeft = useCallback(
    () => <HeaderLeft name={name} avatarColor={avatarColor} />,
    [name, avatarColor]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft,
    });
  }, [navigation, headerLeft]);

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

  return (
    <View style={styles.page}>
      <SegmentedControl
        style={{ marginTop: 16 }}
        values={segmentedValues}
        selectedIndex={selectedIndex}
        onValueChange={onValueChange}
      />

      <Transactions account={account} segmentedValue={segmentedValue} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal,
    paddingBottom: 44
  }
});
