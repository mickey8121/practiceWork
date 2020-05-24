import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { isAndroid } from 'helpers/platformData';

import CustomBtn from './CustomBtn';
import CustomInput from './CustomInput';

const LoginForm = ({
  title,
  name,
  requestHandler,
  loading
}) => {
  const [userData, setUserData] = useState({});

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  useEffect(() => {
    if (isSignUpForm && nameInput) nameInput.current.focus();
    else if (emailInput) emailInput.current.focus();
  }, [isSignUpForm]);

  const isSignUpForm = useMemo(() => name === 'SignUp', [name]);
  const isBtnEnabled = useMemo(
    () => {
      if (
        userData?.email?.trim()?.length >= 5
        && userData?.password?.trim()?.length >= 5
      ) {
        if (isSignUpForm) { // if this signUp form
          return (
            // if the name field is't empty
            userData?.name?.trim()?.length
            // if the email length is greater than 5
            && userData?.email?.trim()?.length >= 5
            // if the password length is greater than 5
            && userData?.password?.trim()?.length >= 5
          );
        }

        return true;
      }

      return false;
    },
    [userData, isSignUpForm]
  );

  const setName = useCallback(v => setUserData(prev => ({ ...prev, name: v })), []);
  const setEmail = useCallback(v => setUserData(prev => ({ ...prev, email: v })), []);
  const setPassword = useCallback(v => setUserData(prev => ({ ...prev, password: v })), []);

  const goToNextInput = useCallback(
    nextInput => nextInput?.current?.focus(),
    [],
  );

  const submitHandler = useCallback(
    () => !loading && isBtnEnabled && requestHandler && requestHandler(userData),
    [loading, isBtnEnabled, requestHandler, userData]
  );

  const onSubmitEditingForName = useCallback(
    () => goToNextInput(emailInput),
    [goToNextInput, emailInput]
  );

  const onSubmitEditingForEmail = useCallback(
    () => goToNextInput(passwordInput),
    [goToNextInput, passwordInput]
  );

  return (
    <KeyboardAvoidingView
      style={styles.form}
      keyboardVerticalOffset={hp(7.8)}
      behavior={isAndroid ? 'height' : 'padding'}
    >
      {isSignUpForm && (
        <CustomInput
          editable={!loading}
          style={styles.customInput}
          placeholder='Name'
          autoCompleteType='name'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
          onChangeText={setName}
          ref={nameInput}

          // Switching to the next input
          onSubmitEditing={onSubmitEditingForName}
          blurOnSubmit={false}
        />
      )}

      <CustomInput
        editable={!loading}
        placeholder='Email'
        style={styles.customInput}
        autoCompleteType='email'
        keyboardType='email-address'
        returnKeyType='next'
        autoCapitalize='none'
        onChangeText={setEmail}
        ref={emailInput}

        // Switching to the next input
        onSubmitEditing={onSubmitEditingForEmail}
        blurOnSubmit={false}
      />

      <CustomInput
        editable={!loading}
        placeholder='Password'
        style={styles.customInput}
        secureTextEntry
        returnKeyType='send'
        onChangeText={setPassword}
        ref={passwordInput}

        // Switching to the next input
        onSubmitEditing={submitHandler}
        blurOnSubmit
      />

      <CustomBtn
        style={styles.submitBtn}
        title={title}
        loading={loading}
        onPress={submitHandler}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: 25
  },
  customInput: {
    marginBottom: 10
  },
  submitBtn: {
    marginTop: 'auto',
    bottom: isAndroid ? 65 : 50
  }
});

export default LoginForm;
