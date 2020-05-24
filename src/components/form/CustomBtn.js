import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import colors from 'styles/colors';
import { paddingHorizontal, borderRadius } from 'styles/guidelines';

import Preloader from 'components/assets/Preloader';

const CustomBtn = ({
  title = '',
  disabled,
  onPress,
  outline,
  titleProps,
  loading,
  preloaderColor = colors.primary,
  preloaderSize = 'small',
  ...props
}) => {
  const onPressHandler = useCallback(() => !disabled && onPress && onPress(), [disabled, onPress]);

  return (
    <View style={{ alignSelf: 'flex-start' }} {...props}>
      <TouchableOpacity
        activeOpacity={outline ? 1 : 0.9}
        style={outline ? styles.btnOutline : styles.btn}
        onPress={onPressHandler}
      >
        {!loading && (
          <Text
            style={outline ? styles.btnOutlineText : styles.text}
            {...titleProps}
          >
            {title}
          </Text>
        )}

        {loading && (
          <Preloader size={preloaderSize} color={preloaderColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const mainBtnStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: 'auto'
};

const styles = StyleSheet.create({
  btn: {
    ...mainBtnStyles,
    width: wp('100%') - paddingHorizontal * 2,
    height: 50,
    backgroundColor: colors.blueBtn,
    borderRadius
  },
  btnOutline: {
    ...mainBtnStyles,
    alignSelf: 'flex-start',
    height: 44,
    paddingHorizontal: 15,
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 17,
    fontFamily: 'SFProText-Semibold',
    color: colors.primary
  },
  btnOutlineText: {
    fontSize: 17,
    fontFamily: 'SFProText-Regular',
    color: colors.blueBtn
  }
});

export default React.memo(CustomBtn);
