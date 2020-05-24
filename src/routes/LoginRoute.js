import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from 'styles/colors';

import LoginScreen from 'screens/LoginScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';

const { Navigator, Screen } = createStackNavigator();

const LoginRouter = () => (
  <Navigator initialRouteName='Login'>
    <Screen
      name='Login'
      options={{
        title: '',
        headerLeft: null,
        headerStyle: {
          backgroundColor: colors.primary,
          height: 0,
          shadowOpacity: 0
        }
      }}
      component={LoginScreen}
    />

    <Screen
      name='SignIn'
      options={{
        title: 'Sign In',
        headerStyle: {
          backgroundColor: '#f9f9f9',
          shadowColor: '#b2b2b2'
        },
        headerTitleStyle: {
          fontSize: 17,
          fontFamily: 'SFProText-Semibold'
        }
      }}
      component={SignInScreen}
    />

    <Screen
      name='SignUp'
      options={{
        title: 'Sign Up',
        headerStyle: {
          backgroundColor: '#f9f9f9',
          shadowColor: '#b2b2b2'
        },
        headerTitleStyle: {
          fontSize: 17,
          fontFamily: 'SFProText-Semibold'
        }
      }}
      component={SignUpScreen}
    />
  </Navigator>
);

export default LoginRouter;
