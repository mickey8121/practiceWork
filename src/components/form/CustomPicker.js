import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Modal
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import colors from 'styles/colors';
import { paddingHorizontal, borderRadius } from 'styles/guidelines';

import { isAndroid } from 'helpers/platformData';

const CustomPicker = ({
  editable = true,
  containerStyle = {},
  options = [],
  value,
  onChange
}) => {
  const [isShow, setIsShow] = useState(false);

  const selectedOption = useMemo(
    () => options?.find(o => o.id === value),
    [options, value]
  );

  const closeModal = useCallback(
    () => setIsShow(false),
    [],
  );

  const openModal = useCallback(
    () => {
      if (editable) {
        setIsShow(true);
        Keyboard.dismiss();
      }
    },
    [editable],
  );

  const optionsRows = useMemo(
    () => options?.map(
      ({ id, label }) => (
        <Picker.Item key={id} label={label} value={id} />
      )
    ),
    [options]
  );

  const pickerWrapperOnPress = useCallback(() => false, []);

  return (
    <>
      <View style={containerStyle}>
        <View style={
            isShow ? styles.backing
              : styles.inactiveBacking
            }
        >
          {isAndroid ? (
            <View style={styles.androidPickerView}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                mode='dropdown'
              >
                {optionsRows}
              </Picker>
            </View>
          ) : (
            <TouchableOpacity onPress={openModal} activeOpacity={0.9}>
              <View
                style={
                  isShow ? styles.inputBg
                    : styles.inactiveInputBg
                }
              >
                <Text style={styles.textInput}>{selectedOption?.label}</Text>
                <Ionicons
                  style={
                  isShow ? styles.dropdownIcon
                    : styles.inactiveDropdownIcon
                }
                  name='md-arrow-dropdown'
                  size={20}
                />
              </View>
            </TouchableOpacity>
          )}

        </View>
      </View>

      <Modal
        animationType='slide'
        transparent
        visible={isShow}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.pickerModalView}>
            <TouchableOpacity
              onPress={pickerWrapperOnPress}
              activeOpacity={1}
              style={styles.pickerWrapper}
            >
              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >
                {optionsRows}
              </Picker>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default CustomPicker;

const inputBgMainStyles = {
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderWidth: 1,
  borderRadius,
  fontSize: 15,
  paddingHorizontal: 12
};

const backingMainStyles = {
  width: wp('100%') - (paddingHorizontal * 2 - 10),
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
  inputBg: {
    ...inputBgMainStyles,
    borderColor: colors.blueBtn,
    backgroundColor: colors.primary
  },
  inactiveInputBg: {
    ...inputBgMainStyles,
    borderColor: '#e2e8ee',
    backgroundColor: colors.inactiveInput,
    color: colors.placeholderInput
  },
  textInput: {
    fontSize: 18
  },
  dropdownIcon: {
    position: 'absolute',
    top: 12,
    right: 20,
    transform: [{ rotate: '180deg' }]
  },
  inactiveDropdownIcon: {
    position: 'absolute',
    top: 16,
    right: 20
  },
  pickerModalView: {
    display: 'flex',
    width: wp(100),
    height: hp(100),
    backgroundColor: 'transparent'
  },
  pickerWrapper: {
    marginTop: 'auto',
    paddingBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: colors.primary
  },
  androidPickerView: {
    ...inputBgMainStyles,
    borderColor: '#ccc'
  }
});
