import React, { useState, useCallback } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  View
} from 'react-native';
import { Button } from 'react-native-elements';

import colors from 'styles/colors';

const { OS } = Platform;
const isAndroid = OS === 'android';

const FloatingBtn = ({
  bottom = '4%',
  right = '2%',
  options
}) => {
  const [open, setOpen] = useState(false);

  const optionsSwitch = useCallback(() => {
    if (!options?.length) return;

    if (options.length > 1) setOpen(!open);
    else if (options[0].pressHandler) options[0].pressHandler();
  }, [open, setOpen, options]);

  const optionPress = useCallback(pressHandler => {
    setOpen(false);
    pressHandler();
  }, []);

  const Options = useCallback(() => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.optionsContainer}
      onPress={optionsSwitch}
    >
      <View style={{ ...styles.optionBtnsBlock, bottom, right }}>
        {options.map(
          o => (
            <Button
              key={o.title}
              containerStyle={styles.optionBtnContainer}
              buttonStyle={styles.optionBtn}
              titleStyle={styles.optionBtnText}
              title={o.title}
              onPress={() => optionPress(o.pressHandler)}
            />
          )
        )}
      </View>
    </TouchableOpacity>
  ),
  [options, bottom, right, optionsSwitch, optionPress]);

  return (
    <>
      <View
        style={{
          ...styles.container,
          right,
          bottom
        }}
      >
        <Button
          containerStyle={styles.mainBtnContainer}
          buttonStyle={styles.mainBtn}
          titleStyle={styles.mainBtnText}
          activeOpacity={0.95}
          title='+'
          onPress={optionsSwitch}
        />
      </View>

      {open && options?.length > 1 && <Options />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 64,
    zIndex: 1000
  },
  mainBtnContainer: {
    marginLeft: 'auto',
    borderRadius: 50,
    height: 60,
    width: 60
  },
  mainBtn: {
    borderRadius: 50,
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2
  },
  mainBtnText: {
    fontSize: isAndroid ? 46 : 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: isAndroid ? 52 : 47,
    color: colors.textOnSecondary
  },
  optionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: `${colors.primaryLight}66`,
    zIndex: 999
  },
  optionBtnsBlock: {
    position: 'absolute',
    paddingBottom: 60
  },
  optionBtnContainer: {
    borderRadius: 7,
    height: 40,
    width: 120,
    marginBottom: 10
  },
  optionBtn: {
    borderRadius: 7,
    height: 40,
    width: 120,
    backgroundColor: colors.secondaryLight,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1
  },
  optionBtnText: {
    fontSize: 13,
    color: colors.textOnSecondary
  }
});

export default FloatingBtn;
