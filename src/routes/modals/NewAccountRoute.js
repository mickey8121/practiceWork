import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { isAndroid } from 'helpers/platformData';

import NewAccountScreen from 'screens/NewAccountScreen';

import CloseBtn from 'components/assets/CloseBtn';

const { Screen } = createStackNavigator();

const headerLeft = () => (
  <Text
    style={{
      position: 'absolute',
      left: 16,
      bottom: 4,
      fontFamily: 'WorkSans-Regular',
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: 38,
    }}
  >
    New Account
  </Text>
);

const headerRight = () => (
  <View
    style={{
      position: 'absolute',
      top: '100%',
      marginTop: isAndroid ? hp(-11.93) : hp(-12.93),
      width: 40,
      height: isAndroid ? hp(11.93) : hp(12.93)
    }}
  >
    <CloseBtn
      style={{ position: 'absolute', top: 18, right: 16 }}
    />
  </View>
);

const headerTitle = () => (
  !isAndroid ? (
    <View
      style={{
        width: 36,
        height: 5,
        marginTop: 7,
        borderRadius: 3,
        backgroundColor: '#c7c7cc'
      }}
    />
  ) : null
);

const NewAccountRoute = () => (
  <Screen
    name='NewAccount'
    component={NewAccountScreen}
    options={{
      headerLeft,
      headerRight,
      headerTitle,
      headerTitleContainerStyle: {
        position: 'absolute',
        top: '100%',
        marginTop: hp(-12.93),
        height: hp(12.93),
        width: 36
      },
      headerStyle: {
        height: isAndroid ? hp(11.93) : hp(12.93),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: 'transparent',
        elevation: 0
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

export default NewAccountRoute;
