import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from '../token/storeToken';

// 서버로 코드 전송 후 토큰 받아오기
const originLogin = async (id, pw, navigation) => {
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

      if(response.data.success = true) {
        console.log("로그인 성공 !: ", response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken);
        navigation.navigate("Home"); // 메인으로 이동
      } else {
        return response.data.error;
      }
    } catch (error) {
      console.error("로그인 에러가 있습니다. ", error);
      return null;
    }
  };

export default originLogin;