import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'screens/HomeScreen';

import AccountRoute from '../modals/AccountRoute';
import NewAccountRoute from '../modals/NewAccountRoute';
import NewTransactionRoute from '../modals/NewTransactionRoute';

const { Navigator, Screen } = createStackNavigator();

const HomeTab = () => (
  <Navigator mode='modal'>
    <Screen
      name='Home'
      options={{ headerStyle: { height: 145 } }}
      component={HomeScreen}
    />

    {/* modals  */}
    {AccountRoute()}
    {NewAccountRoute()}
    {NewTransactionRoute()}
  </Navigator>
);

export default HomeTab;
