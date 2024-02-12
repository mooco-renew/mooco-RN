import React from 'react';

import {Text, View } from 'react-native';

const CustomSwitch = ({
  selectionMode,
}) => {

  return (
    <View>
      <View
        style={{
          height: 38,
          width: 93,
          backgroundColor: '#626262',
          borderRadius: 100,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 4,
        }}>
        <View
          style={{
            flex: 1,

            backgroundColor: selectionMode == 1 ? '#151515': '#626262',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: selectionMode == 1 ? '#ffffff' : '#ffffff',
            }}>
            목록
          </Text>
        </View>
        <View
          style={{
            flex: 1,

            backgroundColor: selectionMode == 2 ? '#151515': '#6266262',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: selectionMode == 2 ? '#ffffff' : '#ffffff',
            }}>
            요청
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CustomSwitch;