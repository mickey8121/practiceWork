import { Alert } from 'react-native';

const onError = ({ title = 'Error', message = '' }) => (
  Alert.alert(
    title,
    message,
    [{ text: 'OK', style: 'cancel' }],
    { cancelable: true }
  )
);

export default onError;
