import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isThereToken = async () => {
  try {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      console.log('value : ', value);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    alert('에러 발생');
  }
};

export default isThereToken;
