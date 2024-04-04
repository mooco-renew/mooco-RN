import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_HOST } from "@env";

// 프로필 데이터 GET!
const getProfileData = async (friendId = null) => {
  const accessToken = await AsyncStorage.getItem("access_token");
  try {
    const endpoint = friendId
      ? `/api/v1/users/${friendId}/my-page`
      : "/api/v1/users/my-page";
    const response = await axios.get(`${SERVER_HOST}${endpoint}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("프로필 조회 에러", error);
    return null;
  }
};

export default getProfileData;
