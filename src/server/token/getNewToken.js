import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from "../token/storeToken";
import AsyncStorage from '@react-native-async-storage/async-storage';

// 리프레시로 새로운 액세스 받기토큰 받아오기
const getNewToken = async () => {
  const value = await AsyncStorage.getItem('refresh_token');
  
    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/reissue`,
        {
          headers: { 
          'ReAuthorization': `Bearer ${value}`
          }
      },
      );

      if(response.data.success == true) {
        console.log('새 토큰 발급 성공!', response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken); 
      } else {
        console.log('새 토큰 발급 실패', response.data);
      }
    } catch (error) {
      console.error("에러가 있습니다. ", error);
    }
  };

export default getNewToken;