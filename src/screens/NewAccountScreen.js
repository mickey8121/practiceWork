import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import NewAccountContainer from 'containers/NewAccount';

import DismissKeyboard from 'components/assets/DismissKeyboard';

const NewAccountScreen = () => (
  <DismissKeyboard>
    <View style={styles.page}>
      <NewAccountContainer />
    </View>
  </DismissKeyboard>
);

export default NewAccountScreen;

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal
  }
});
