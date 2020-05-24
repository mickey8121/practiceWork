import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import colors from 'styles/colors';
import { borderRadius } from 'styles/guidelines';

import { isAndroid } from 'helpers/platformData';

import CustomBtn from './CustomBtn';

const CustomInput = ({
  style = {},
  inputStyle,
  secureTextEntry,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);

  const switchFocus = useCallback(
    () => setIsFocused(!isFocused),
    [isFocused]
  );

  const switchSecure = useCallback(
    () => setIsSecure(!isSecure),
    [isSecure]
  );

  const ShowBtn = useCallback(
    () => (
      <CustomBtn
        title={isSecure ? 'Show' : 'Hide'}
        outline
        style={styles.showBtn}
        titleProps={{ style: styles.showBtnTitle }}
        onPress={switchSecure}
      />
    ),
    [isSecure, switchSecure]
  );

  const currentInputStyle = useMemo(
    () => (
      inputStyle || (isFocused ? styles.input : styles.inactiveInput)
    ),
    [inputStyle, isFocused]
  );

  return (
    <View style={style}>
      <View style={{ marginRight: -10 }}>
        <View
          style={
            isFocused ? styles.backing
              : styles.inactiveBacking
          }
        >
          <TextInput
            style={currentInputStyle}
            placeholderTextColor={colors.placeholderInput}
            onFocus={switchFocus}
            onBlur={switchFocus}
            secureTextEntry={isSecure}
            ref={ref || null}
            {...props}
          />

          {secureTextEntry && <ShowBtn />}
        </View>
      </View>
    </View>
  );
};

const inputMainStyles = {
  width: '100%',
  height: '100%',
  borderWidth: 1,
  borderRadius,
  fontSize: 15,
  paddingHorizontal: 12
};

const backingMainStyles = {
  width: '100%',
  height: 60,
  padding: 5,
  borderRadius: 10,
  position: 'relative',
  left: -5
};

const styles = StyleSheet.create({
  backing: {
    ...backingMainStyles,
    backgroundColor: colors.glowInput
  },
  inactiveBacking: {
    ...backingMainStyles,
    backgroundColor: 'transparent'
  },
  input: {
    ...inputMainStyles,
    borderColor: colors.blueBtn,
    backgroundColor: colors.primary
  },
  inactiveInput: {
    ...inputMainStyles,
    borderColor: isAndroid ? '#ccc' : '#e2e8ee',
    backgroundColor: colors.inactiveInput
  },
  showBtn: {
    position: 'absolute',
    right: 5,
    height: 60
  },
  showBtnTitle: {
    fontSize: 15,
    color: colors.blueBtn
  }
});

export default React.forwardRef(CustomInput);
