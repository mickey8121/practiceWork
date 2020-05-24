import React, { useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import useAccounts from 'hooks/useAccounts';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import { isAndroid } from 'helpers/platformData';
import onError from 'helpers/onError';

import Accounts from 'containers/Accounts';

import AddBtn from 'components/assets/AddBtn';
import BalancePin from 'components/assets/BalancePin';

const headerLeft = () => (
  <Text
    style={{
      position: 'absolute',
      left: 16,
      bottom: 20,
      fontFamily: 'WorkSans-Regular',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 28
    }}
  >
    Home
  </Text>
);

const HomeScreen = ({ navigation }) => {
  const accounts = useAccounts();

  const addBtnOptions = useMemo(() => ([
    {
      title: 'Add account',
      onPress: () => navigation.navigate('NewAccount')
    },
    ...(accounts?.length ? [{ // show if an accounts are exists
      title: 'Add transaction',
      onPress: () => navigation.navigate('NewTransaction')
    }] : [])
  ]),
  [navigation, accounts]);

  const headerRight = useCallback(
    () => (
      <AddBtn
        style={{ position: 'absolute', bottom: 12, right: isAndroid ? 5 : 16 }}
        addBtnOptions={addBtnOptions}
      />
    ),
    [addBtnOptions]
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={isAndroid ? {
            position: 'absolute',
            left: wp(-18) - 1,
            bottom: hp(-11),
            marginBottom: isAndroid ? 4 : 0,
            width: wp(100),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          } : { bottom: '-48.5%' }}
        >
          <BalancePin />
        </View>
      ),
      headerStyle: {
        height: hp(17.86),
        borderWidth: 1,
        borderColor: colors.borderOnPrimary,
        backgroundColor: colors.primary,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerLeft,
      headerRight
    });
  }, [navigation, headerRight]);

  return (
    <View style={styles.homeView}>
      <Accounts />
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    paddingHorizontal,
    backgroundColor: colors.primary
  }
});

export default HomeScreen;
