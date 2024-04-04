import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from '../token/storeToken';

// 서버로 코드 전송 후 토큰 받아오기
const originLogin = async (id, pw, navigation) => {
  const formData = new FormData();

    formData.append("serial_id", id);
    formData.append("password", pw);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/sign-in`,
        formData,
        config
      );

      console.log(response.data);
      if(response.data.success == true) {
        console.log("로그인 성공 !: ", response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken);
        navigation.navigate("Home"); // 메인으로 이동
      } else if(response.data.success == false) {
        console.log("로그인 실패 !: ", response.data);
        return response.data;
      }
    } catch (error) {
      // 사용자의 잘못된 입력값에 대한 로그인 에러 처리를 여기서
      console.error("잘못된 아이디, 비밀번호입니다.", error);
      alert("잘못된 아이디, 비밀번호입니다.");
      return null;
    }
  };

export default originLogin;