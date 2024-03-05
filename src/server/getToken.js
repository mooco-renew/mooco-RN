import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = () => {
    const navigation = useNavigation();

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('access_token');
        if (value !== null) {
          console.log('value : ', value);
          setData(value);
          navigation.navigate('GetProfile');
        } else {
          setData(null);
          alert('로그인이 필요합니다.');
        }
      } catch (e) {
        console.error('error', e);
        alert('에러 발생');
      }
    };
    getData();
  }, []);

  return data; // 데이터와 에러를 반환합니다.
};

export default getToken;
