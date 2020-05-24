import React, { useMemo } from 'react';
import { Text, StatusBar } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator }
  from '@react-navigation/material-top-tabs';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { useQuery } from '@apollo/react-hooks';

import ME_QUERY from 'graphql/queries/user/me';

import { paddingHorizontal } from 'styles/guidelines';

import { MeContext } from 'hooks/useMe';

import colors from 'styles/colors';

import Preloader from 'components/assets/Preloader';

import LoginRouter from './LoginRoute';
import HomeTab from './tabs/HomeTab';
import TransactionsTab from './tabs/TransactionsTab';
import ProfileTab from './tabs/ProfileTab';

const Tab = createMaterialTopTabNavigator();

const tabBarTitle = ({ color }, title) => (
  <Text
    style={{
      textAlign: 'center',
      fontFamily: 'SFProText-Medium',
      fontSize: 11,
      color
    }}
  >
    {title}
  </Text>
);

const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      pressOpacity: 0.8,
      activeTintColor: colors.defaultColor,
      inactiveTintColor: '#8492a2',
      style: {
        height: hp(10.34),
        shadowColor: '#dcdad9',
        shadowOffset: {
          width: 0,
          height: -0.5,
        },
        shadowOpacity: 1,
        shadowRadius: 0,

        elevation: 5,
      },
      indicatorStyle: {
        top: 0,
        left: paddingHorizontal,
        width: wp(33.3) - paddingHorizontal * 2,
        height: 2,
        borderRadius: 10,
        backgroundColor: colors.defaultColor
      },
      showIcon: true,
      tabStyle: {
        paddingTop: 5
      }
    }}
    keyboardDismissMode='on-drag'
    tabBarPosition='bottom'
  >

    <Tab.Screen
      name='Home'
      options={{
        tabBarLabel: props => tabBarTitle(props, 'Home'),
        tabBarIcon: ({ color }) => (
          <EntypoIcon name='home' size={24} color={color} />
        )
      }}
      component={HomeTab}
    />

    <Tab.Screen
      name='Transactions'
      options={{
        tabBarLabel: props => tabBarTitle(props, 'Transactions'),
        tabBarIcon: ({ color }) => (
          <AntDIcon
            name='arrowsalt'
            size={22}
            color={color}
          />
        )
      }}
      component={TransactionsTab}
    />

    <Tab.Screen
      name='Profile'
      options={{
        tabBarLabel: props => tabBarTitle(props, 'Profile'),
        tabBarIcon: ({ color }) => (
          <SimpleLineIcons
            name='emotsmile'
            size={22}
            color={color}
          />
        )
      }}
      component={ProfileTab}
    />

  </Tab.Navigator>
);

const Router = () => {
  const { loading, data } = useQuery(ME_QUERY);
  const user = useMemo(() => data?.me, [data]);
  // const user = useMemo(
  //   () => ({ name: 'Mike', email: 'mike@drozd.com', balance: -100 }),
  //   []
  // ); // fake

  if (loading) return <Preloader />;

  return (
    <MeContext.Provider value={user}>
      <StatusBar barStyle='dark-content' />
      <NavigationContainer>

        {!user && <LoginRouter />}
        {user && <Tabs />}

      </NavigationContainer>
    </MeContext.Provider>
  );
};

export default gestureHandlerRootHOC(Router);
