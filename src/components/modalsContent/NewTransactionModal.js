import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import currenciesOptions from 'helpers/currenciesOptions';

import colors from 'styles/colors';
import { borderRadius } from 'styles/guidelines';

import CustomBtn from 'components/form/CustomBtn';
import CustomInput from 'components/form/CustomInput';
import CustomPicker from 'components/form/CustomPicker';

const isAndroid = Platform.OS === 'android';

const getCurrencyLabel = currency => currenciesOptions.find(o => o.id === currency)?.label;

const NewTransactionModal = ({
  submitHandler,
  loadRate,
  accountsList = [],
  targetAccount
}) => {
  const preparedOptions = useMemo(
    () => accountsList?.map(acc => ({ id: acc.id, label: acc.name })),
    [accountsList]
  );

  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState(preparedOptions?.[0]?.id || '');

  const amountInputRef = useRef(null);

  useEffect(() => {
    if (amountInputRef?.current) amountInputRef.current.focus();
  }, [amountInputRef]);

  const currency = useMemo(
    () => {
      if (targetAccount) return targetAccount.currency;
      return accountsList?.find(({ id }) => id === accountId)?.currency;
    },
    [targetAccount, accountsList, accountId]
  );

  useEffect(() => loadRate({ variables: { from: currency } }), [currency, loadRate]);

  const pickerOnChange = useCallback(value => setAccountId(value), []);

  const onPress = useCallback(() => {
    const targetAccountLocal = (
      targetAccount || accountsList.find(acc => acc.id === accountId)
    );

    submitHandler(amount, targetAccountLocal);
  }, [amount, accountId, targetAccount, submitHandler, accountsList]);

  const setAmountHandler = useCallback(v => {
    if (/^[\d,.-]*$/.test(v) || v === '') setAmount(v);
  }, []);

  const btnIsEnabled = useMemo(
    () => amount?.trim().length && (accountId || targetAccount),
    [amount, accountId, targetAccount]
  );

  return (
    <KeyboardAvoidingView
      style={styles.form}
      keyboardVerticalOffset={hp(23.3)}
      behavior={isAndroid ? 'height' : 'padding'}
    >
      {!targetAccount && (
        <CustomPicker
          containerStyle={styles.customPicker}
          value={accountId}
          onChange={pickerOnChange}
          options={preparedOptions}
        />
      )}

      <View style={styles.amountView}>
        <CustomInput
          placeholder='Amount'
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmountHandler}
          ref={amountInputRef}
          autoCorrect={false}
          keyboardType='decimal-pad'
          blurOnSubmit
        />

        <CustomInput
          editable={false}
          style={styles.currencyInput}
          value={getCurrencyLabel(currency)}
          inputStyle={styles.inputStyle}
          autoCorrect={false}
        />
      </View>

      <CustomBtn
        disabled={!btnIsEnabled}
        style={styles.submitBtn}
        title='Create'
        onPress={onPress}
      />
    </KeyboardAvoidingView>
  );
};

export default NewTransactionModal;

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
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  amountInput: {
    width: wp(63.47),
    marginRight: wp(3.2)
  },
  currencyInput: {
    width: wp(24.53),
  },
  submitBtn: {
    marginTop: 'auto',
    marginBottom: isAndroid ? 40 : 25
  },
  inputStyle: {
    fontSize: 16,
    height: 50,
    textAlign: 'center',
    backgroundColor: colors.inactiveInput,
    borderColor: isAndroid ? '#ccc' : '#e2e8ee',
    borderWidth: 1,
    borderRadius
  }
});
