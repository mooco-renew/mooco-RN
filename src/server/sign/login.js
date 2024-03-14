import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 서버로 코드 전송 후 토큰 받아오기
const originLogin = async (id, pw) => {
    const value = await AsyncStorage.getItem('access_token');

    const data = {
      id: id,
      pw: pw,
    };
    const config = {
      headers: {
        'Authorization': `Bearer ${value}`
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/user/login`,
        data,
        config
      );
      console.log("성공 !: ", response.data);
      return response.data;
    } catch (error) {
      console.error("에러가 있습니다. ", error);
      throw error;
    }
  };

export default originLogin;