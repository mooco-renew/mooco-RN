import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('access_token');
        if (value !== null) {
          console.log('value : ', value);
          setData(value);
        } else {
          setData(null);
        }
      } catch (e) {
        console.error('error', e);
        setError(e);
      }
    };
    getData();
  }, []);

  return data; // 데이터와 에러를 반환합니다.
};

export default getToken;
