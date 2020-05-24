import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { isAndroid } from 'helpers/platformData';

import AccountScreen from 'screens/AccountScreen';

import CloseBtn from 'components/assets/CloseBtn';

const { Screen } = createStackNavigator();

const headerRight = () => (
  <CloseBtn style={{ position: 'absolute', right: 16, bottom: 15 }} />
);

const headerTitle = () => (
  <View
    style={{
      display: isAndroid ? 'none' : 'flex',
      width: 36,
      height: 5,
      marginTop: 7,
      borderRadius: 3,
      backgroundColor: '#c7c7cc'
    }}
  />
);

const AccountRoute = () => (
  <Screen
    name='Account'
    component={AccountScreen}
    options={{
      headerLeft: null,
      headerRight,
      headerTitle,
      headerTitleContainerStyle: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-start',
        height: 61,
        width: 36
      },
      headerStyle: {
        height: 61,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#cdced2'
      },
      cardOverlay: () => (
        <View style={{
          backgroundColor: '#14121E',
          opacity: 0.5,
          height: '100%',
          width: '100%'
        }}
        />
      ),
      cardOverlayEnabled: true,
      cardStyle: {
        paddingTop: hp(14.04),
        backgroundColor: 'transparent'
      }
    }}
  />
);

export default AccountRoute;
