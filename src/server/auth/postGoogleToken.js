import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

const storeData = async (accessToken, refreshToken) => {
    try {
      if(accessToken != null && refreshToken != null) {
        await AsyncStorage.setItem("access_token", accessToken);
        await AsyncStorage.setItem("refresh_token", refreshToken);
      } else {
        console.log("빈 값입니다. ", error);  
      }
    } catch (error) {
      console.log("토큰 저장에 실패하였습니다. ", error);
    }
  };

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
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/google`,
        data,
        config
      );
      console.log("성공 !: ", response.data);
      if(response.data.success == true) {
        storeData(response.data.data.accessToken, response.data.data.refreshToken); 
        if (response.data.data.isExisted) {
          navigation.navigate("Home"); // 임시로 daily
        } else {
          navigation.navigate("GetProfile"); // 추가 정보 입력
        }
      } else {
        alert("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error("에러가 있습니다. ", error);
    }
  };

export default postGoogleToken;