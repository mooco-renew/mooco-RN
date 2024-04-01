import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from '../token/storeToken';

// 서버로 코드 전송 후 토큰 받아오기
const originLogin = async (id, pw, navigation) => {
  console.log(id, pw);
    const data = {
      serial_id: id,
      password: pw,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/sign-in`,
        data,
        config
      );

      console.log(response.data);
      if(response.data.success = true) {
        console.log("로그인 성공 !: ", response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken);
        navigation.navigate("Home"); // 메인으로 이동
      } else {
        console.log("로그인 실패 !: ", response.data);
        return response.data.error;
      }
    } catch (error) {
      console.error("로그인 에러가 있습니다. ", error);
      alert("error");
      return null;
    }
  };

export default originLogin;