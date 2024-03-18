import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

const storeData = async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("refresh_token", refreshToken);
    } catch (error) {
      console.log("토큰 저장에 실패하였습니다. ", error);
    }
  };

// 서버로 코드 전송 후 토큰 받아오기
const postToken = async (accessToken, navigation) => {
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
        navigation.navigate("OnBoarding"); 
      }
    } catch (error) {
      console.error("에러가 있습니다. ", error);
    }
  };

export default postToken;