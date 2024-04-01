import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from "../token/storeToken";

// 서버로 코드 전송 후 토큰 받아오기
const postKakaoToken = async (accessToken, navigation) => {
    const data = {
      accessToken: accessToken,
      provider: "Kakao",
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/kakao`,
        data,
        config
      );
      if(response.data.success == true) {
        console.log('카카오 로그인 성공!', response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken); 
        if (response.data.data.isExisted) {
          navigation.navigate("Home"); // 존재하는 유저라면 home으로
        } else {
          navigation.navigate("GetProfile"); // 존재하지 않는다면 추가 정보 입력 필요
        }
      } else {
        return response.data.error;
      }
    } catch (error) {
      console.error("에러가 있습니다. ", error);
      alert("error");
      return null;
    }
  };

export default postKakaoToken;