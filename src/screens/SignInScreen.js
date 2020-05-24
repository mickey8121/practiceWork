import React from 'react';
import { View, StyleSheet } from 'react-native';

import SignIn from 'containers/SignIn';

import DismissKeyboard from 'components/assets/DismissKeyboard';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

const SignInScreen = () => (
  <DismissKeyboard>
    <View style={styles.page}>
      <SignIn />
    </View>
  </DismissKeyboard>
);

const styles = StyleSheet.create({
  page: {
    height: '100%',
    paddingHorizontal,
    backgroundColor: colors.primary
  }
});

export default SignInScreen;
