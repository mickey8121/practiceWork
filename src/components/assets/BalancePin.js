import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import useMe from 'hooks/useMe';

import colors from 'styles/colors';

import { isAndroid } from 'helpers/platformData';

import amountСonversion from 'utils/amountСonversion';

const BalancePin = ({ large, ...props }) => {
  const { balance } = useMe();

  const pinStyles = useMemo(
    () => (large ? styles.balancePinBig : styles.balancePin),
    [large]
  );

  const textStyles = useMemo(
    () => (large ? styles.balancePinTextBig : styles.balancePinText),
    [large]
  );

  const pinColors = useMemo(
    () => {
      const balanceColor = balance >= 0 ? colors.positiveGreen : colors.negativeRed;

      return {
        backgroundColor: balanceColor,
        shadowColor: balanceColor
      };
    },
    [balance]
  );

  const preparedBalance = useMemo(
    () => amountСonversion(balance, 'USD', ' '),
    [balance]
  );

  return (
    <View {...props}>
      <View style={{ ...pinStyles, ...pinColors }}>
        <Text style={textStyles}>
          {preparedBalance}
        </Text>
      </View>
    </View>
  );
};

const mainPinStyles = {
  position: 'relative',
  alignSelf: 'flex-start',
  backgroundColor: colors.positiveGreen,
  shadowColor: colors.positiveGreen,
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 1
};

const mainTextStyles = {
  color: colors.primary,
  fontFamily: 'WorkSans-Bold',
};

const styles = StyleSheet.create({
  balancePin: {
    paddingHorizontal: 15,
    paddingVertical: isAndroid ? 2 : 4,
    borderRadius: 13.5,
    ...mainPinStyles
  },
  balancePinBig: {
    paddingHorizontal: 28,
    paddingVertical: isAndroid ? 6 : 8,
    borderRadius: 19.5,
    ...mainPinStyles
  },
  balancePinText: {
    fontSize: 16,
    ...mainTextStyles
  },
  balancePinTextBig: {
    fontSize: 20,
    ...mainTextStyles
  }
});

export default BalancePin;
