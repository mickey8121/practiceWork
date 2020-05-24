import React from 'react';
import { View, StyleSheet } from 'react-native';

import SignUp from 'containers/SignUp';

import DismissKeyboard from 'components/assets/DismissKeyboard';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

const SignUpScreen = () => (
  <DismissKeyboard>
    <View style={styles.page}>
      <SignUp />
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

export default SignUpScreen;
