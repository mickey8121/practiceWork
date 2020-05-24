import AsyncStorage from '@react-native-community/async-storage';

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem('token');
  return token;
};

export const setToken = newToken => {
  token = newToken;
  return AsyncStorage.setItem('token', newToken);
};

export const removeToken = () => {
  token = undefined;
  return AsyncStorage.removeItem('token');
};
