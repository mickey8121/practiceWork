import React, { useCallback, useRef } from 'react';
import {
  ActionSheetIOS, View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'styles/colors';

import { paddingHorizontal } from 'styles/guidelines';

import { isAndroid } from 'helpers/platformData';

const AddBtn = ({ style, addBtnOptions = [] }) => {
  const refRBSheet = useRef();

  const onPressOption = useCallback(index => {
    if (isAndroid) refRBSheet.current.close();
    addBtnOptions[isAndroid ? index : index - 1]?.onPress();
  }, [addBtnOptions]);

  const onPress = useCallback(() => {
    if (addBtnOptions.length === 1) {
      addBtnOptions[0].onPress();
    }

    if (addBtnOptions.length > 1) {
      const customOptions = addBtnOptions.map(o => o?.title);

      if (isAndroid) {
        refRBSheet.current.open();
      } else {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', ...customOptions],
            cancelButtonIndex: 0
          },
          onPressOption
        );
      }
    }
  }, [addBtnOptions, onPressOption]);

  const RBSheetComponent = useCallback(
    () => {
      if (isAndroid) {
        return (
          <RBSheet
            ref={refRBSheet}
            animationType='fade'
            closeOnDragDown
            closeOnPressMask
            customStyles={{
              draggableIcon: {
                display: 'none'
              },
              wrapper: {
                backgroundColor: 'rgba(8, 7, 12, 0.5)'
              },
              container: {
                height: 'auto'
              }
            }}
          >
            <View>
              {addBtnOptions.map((option, index) => (
                <TouchableOpacity
                  style={styles.androidOption}
                  activeOpacity={0.9}
                  onPress={() => onPressOption(index)}
                >
                  {!index ? (
                    <MaterialIcons
                      style={{ marginLeft: paddingHorizontal }}
                      name='payment'
                      size={34}
                      color='#b2b2b2'
                    />
                  ) : (
                    <MaterialIcons
                      style={{ marginLeft: paddingHorizontal }}
                      name='attach-money'
                      size={34}
                      color='#b2b2b2'
                    />
                  )}
                  <Text style={styles.androidOptionText}>{option.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </RBSheet>
        );
      }

      return null;
    },
    [addBtnOptions, onPressOption],
  );

  const CurrentIcon = useCallback(
    () => {
      if (isAndroid) {
        if (addBtnOptions.length > 1) {
          return (
            <MaterialCommunityIcons
              style={{ bottom: 3 }}
              name='dots-vertical'
              size={28}
              color={colors.blueBtn}
            />
          );
        }

        return <MaterialIcons style={{ bottom: 5 }} name='add' size={34} color={colors.blueBtn} />;
      }

      return <AntDIcon name='pluscircleo' size={20} color={colors.blueBtn} />;
    },
    [addBtnOptions],
  );

  return (
    <View style={style || {}}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>

        <CurrentIcon />

        {isAndroid && <RBSheetComponent />}

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44
  },
  androidOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  androidOptionText: {
    fontSize: 18,
    marginLeft: paddingHorizontal,
    paddingVertical: 20,
    color: '#050505'
  }
});

export default AddBtn;
