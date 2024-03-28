import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isThereToken = () => {
    const navigation = useNavigation();
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('access_token');
        if (value !== null) {
          console.log('value : ', value);
        } else {
          alert('로그인이 필요합니다.');
        }
      } catch (e) {
        console.error('error', e);
        alert('에러 발생');
      }
    };
    getData();
};

export default isThereToken;
