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
          'Authorization': `Bearer ${value}`
          }
      },
      );

      if(response.data.success == true) {
        storeData(response.data.data.accessToken, response.data.data.refreshToken); 
      } else {
        return response.data.error;
      }
    } catch (error) {
      console.error("에러가 있습니다. ", error);
      return null;
    }
  };

export default getNewToken;