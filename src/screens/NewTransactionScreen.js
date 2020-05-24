import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from 'styles/colors';
import { paddingHorizontal } from 'styles/guidelines';

import NewTransactionContainer from 'containers/NewTransaction';

import DismissKeyboard from 'components/assets/DismissKeyboard';

const NewTransactionScreen = () => (
  <DismissKeyboard>
    <View style={styles.page}>
      <NewTransactionContainer />
    </View>
  </DismissKeyboard>
);

export default NewTransactionScreen;

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal
  }
});
