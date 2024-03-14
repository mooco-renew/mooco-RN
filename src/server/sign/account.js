import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 서버로 코드 전송 후 토큰 받아오기
const originAccount = async (id, pw, name, image) => {
    const value = await AsyncStorage.getItem('access_token');
  const formData = new FormData();

  const file = {
    name: image[0],
    type: Platform.OS === "android" ? "image/jpeg" : "image/jpg",
    uri: image[2],
  };

  formData.append("id", id);
  formData.append("pw", pw);
  formData.append("profileImage", file);
  formData.append("nickname", nickname);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${value}`,
    },
  };

    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/user/account`,
        formData,
        config
      );
      console.log("성공 !: ", response.data);
      return response.data;
    } catch (error) {
      console.error("에러가 있습니다. ", error);
      throw error;
    }
  };

export default originAccount;