import React, { useCallback } from 'react';
import {
  StyleSheet, Text, View, Alert
} from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import { useApolloClient } from '@apollo/react-hooks';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import useMe from 'hooks/useMe';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import BalancePin from 'components/assets/BalancePin';
import CustomBtn from 'components/form/CustomBtn';

import { removeToken } from 'utils/tokenControl';

const ProfileScreen = ({ navigation }) => {
  const client = useApolloClient();
  const {
    name,
    email
  } = useMe();

  const logoutHandler = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure? Log out from the app?',
      [
        {
          text: 'No',
          style: 'default',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await removeToken();
            client.resetStore()
              .then(() => navigation.navigate('Login'));
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  }, [client, navigation]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.profileCard}>
          <Gravatar
            options={{
              email,
              parameters: {
                size: '200',
                d: 'mm',
                default: 'retro'
              },
              secure: true
            }}
            style={styles.roundedProfileImage}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>

            <BalancePin large style={{ marginTop: hp(2.46) }} />
          </View>
        </View>

        <CustomBtn
          outline
          style={styles.logoutBtn}
          title='Logout'
          onPress={logoutHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    paddingHorizontal,
    backgroundColor: colors.primary
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  profileCard: {
    alignItems: 'center',
    width: '100%',
    paddingTop: hp(4.8)
  },
  roundedProfileImage: {
    width: 175,
    height: 175,
    borderRadius: 100
  },
  info: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(2.46)
  },
  name: {
    fontSize: 20,
    fontFamily: 'SFProText-Medium',
    color: '#14121E'
  },
  email: {
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
    paddingTop: 7,
    color: '#8492A2'
  },
  logoutBtn: {
    alignSelf: 'center',
    marginBottom: hp(2.34)
  }
});

export default ProfileScreen;
