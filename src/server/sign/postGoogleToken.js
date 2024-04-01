import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from "../token/storeToken";

// google에서 데이터 받아오기 예시
const postGoogle = async (accessToken) => {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    console.log('User Info:', response.data);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};



// 서버로 코드 전송 후 토큰 받아오기
const postGoogleToken = async (accessToken, navigation) => {
    const data = {
      accessToken: accessToken,
      provider: "Google",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log('구글 로그인 시도 중');
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/google`,
        data,
        config
      );
      console.log(response.data);
      if(response.data.success == true) {
        console.log('구글 로그인 성공!', response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken); 
        if (response.data.data.isExisted) {
          navigation.navigate("Home"); // 존재하는 유저라면 home으로
        } else {
          navigation.navigate("GetProfile"); // 존재하지 않는다면 추가정보 입력
        }
      } else {
        console.log(response.data);
        return response.data.error;
      }
    } catch (error) {
      console.log(error);
      alert("error");
      return null;
    }
  };

export default postGoogleToken;