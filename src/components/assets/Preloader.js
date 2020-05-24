import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import colors from 'styles/colors';

const Preloader = ({ color, size = 'large' }) => (
  <View style={styles.preloader}>
    <ActivityIndicator size={size} color={color || colors.secondaryDark} />
  </View>
);

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%'
  }
});

export default React.memo(Preloader);
