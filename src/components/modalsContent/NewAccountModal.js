import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import currenciesOptions from 'helpers/currenciesOptions';
import { isAndroid } from 'helpers/platformData';

import CustomBtn from 'components/form/CustomBtn';
import CustomInput from 'components/form/CustomInput';
import CustomPicker from 'components/form/CustomPicker';

const NewAccountModal = ({ submitHandler }) => {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('USD');

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef?.current) nameInputRef.current.focus();
  }, [nameInputRef]);

  const pickerOnChange = useCallback(
    value => setCurrency(value),
    []
  );

  const onChangeName = useCallback(v => {
    if (/^[\s\w\d(),.-]*$/.test(v) || v === '') setName(v);
  },
  []);

  const onPress = useCallback(
    () => submitHandler(name.trim(), currency),
    [submitHandler, name, currency],
  );

  const btnIsEnabled = useMemo(
    () => name?.trim().length && currency?.trim().length,
    [name, currency]
  );

  return (
    <KeyboardAvoidingView
      style={styles.form}
      keyboardVerticalOffset={hp(27)}
      behavior={isAndroid ? 'height' : 'padding'}
    >
      <CustomInput
        style={styles.customInput}
        placeholder='Name'
        autoCorrect={false}
        keyboardType='default'
        returnKeyType='done'
        ref={nameInputRef}
        value={name}
        onChangeText={onChangeName}
      />

      <CustomPicker
        containerStyle={styles.customPicker}
        value={currency}
        onChange={pickerOnChange}
        options={currenciesOptions}
      />

      <CustomBtn
        disabled={!btnIsEnabled}
        style={styles.submitBtn}
        title='Create'
        onPress={onPress}
      />
    </KeyboardAvoidingView>
  );
};

export default NewAccountModal;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingTop: hp(2.46)
  },
  customInput: {
    marginBottom: hp(1.85)
  },
  customPicker: {
    marginBottom: hp(2.46)
  },
  submitBtn: {
    marginTop: 'auto',
    marginBottom: isAndroid ? 40 : 25
  }
});
