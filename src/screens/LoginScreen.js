import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet
} from 'react-native';

import colors from 'styles/colors';

import Splashscreen from 'components/Splashscreen';
import CustomBtn from 'components/form/CustomBtn';

const LoginScreen = ({ navigation }) => {
  const goToSignIn = useCallback(
    () => navigation.push('SignIn'),
    [navigation]
  );

  const goToSignUp = useCallback(
    () => navigation.push('SignUp'),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar barStyle='dark-content' />

      <Splashscreen />
      <Text style={styles.description}>
        Ut nisi minim ut adipisicing consectetur minim laborum ea sit ad aliquip sint.
      </Text>

      <View style={styles.btnsSet}>
        <CustomBtn onPress={goToSignIn} title='Sign In' />
        <CustomBtn onPress={goToSignUp} style={styles.bottomBtn} title='Sign Up' outline />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: colors.primary
  },
  description: {
    marginTop: 14,
    fontSize: 17,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center'
  },
  btnsSet: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 25
  },
  bottomBtn: {
    marginTop: 16
  }
});

export default LoginScreen;
