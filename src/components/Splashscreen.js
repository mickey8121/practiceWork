import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Splashscreen from 'assets/img/Splashscreen';

const SplashscreenComponent = () => (
  <View style={styles.splashscreen}>
    <Splashscreen />
    <Text style={styles.title}>My finances</Text>
  </View>
);

const styles = StyleSheet.create({
  splashscreen: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: hp('16.26%'),
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 43,
    fontFamily: 'WorkSans-Bold',
    marginTop: hp('10.71%')
  }
});

export default React.memo(SplashscreenComponent);
