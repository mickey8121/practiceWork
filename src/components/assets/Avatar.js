import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Avatar = ({
  color = '#8492a2',
  symbol = 'X',
  short,
  ...props
}) => {
  const bgStyles = useMemo(
    () => (
      short ? styles.bgShort
        : styles.bg
    ),
    [short]
  );

  const symbolStyles = useMemo(
    () => (
      short ? styles.symbolShort
        : styles.symbol),
    [short]
  );

  return (
    <View {...props}>
      <View style={{ ...bgStyles, backgroundColor: color }}>
        <Text style={symbolStyles}>
          {symbol.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const mainBgStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100
};

const mainSymbolStyles = {
  fontFamily: 'WorkSans-SemiBold',
  color: '#fff'
};

const styles = StyleSheet.create({
  bg: {
    width: 44,
    height: 44,
    ...mainBgStyles
  },
  bgShort: {
    width: 37,
    height: 37,
    ...mainBgStyles
  },
  symbol: {
    fontSize: 30,
    ...mainSymbolStyles
  },
  symbolShort: {
    fontSize: 25,
    ...mainSymbolStyles
  }
});

export default Avatar;
