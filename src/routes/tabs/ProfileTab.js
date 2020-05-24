import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import colors from 'styles/colors';

import ProfileScreen from 'screens/ProfileScreen';

const { Navigator, Screen } = createStackNavigator();

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
    Profile
  </Text>
);

const ProfileTab = () => (
  <Navigator>
    <Screen
      name='Profile'
      options={{
        headerTitle: null,
        headerStyle: {
          height: hp(17.86),
          borderWidth: 1,
          borderColor: colors.borderOnPrimary,
          backgroundColor: colors.primary,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerLeft
      }}
      component={ProfileScreen}
    />
  </Navigator>
);

export default ProfileTab;
