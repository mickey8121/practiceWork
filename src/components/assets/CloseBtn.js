import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CloseBtn = props => {
  const { popToTop } = useNavigation();

  const onPress = useCallback(
    () => popToTop(),
    [popToTop]
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      {...props}
    >
      <Ionicons name='ios-close-circle' size={24} color='#aaa' />
    </TouchableOpacity>
  );
};

export default CloseBtn;
