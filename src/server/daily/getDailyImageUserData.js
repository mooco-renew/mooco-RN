import { SERVER_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getDailyImageUserData = async () => {
  const accessToken = await AsyncStorage.getItem("access_token");
  try {
    const response = await axios.get(`${SERVER_HOST}/api/v1/users/my-page`, {
      headers: {
        Authorization: `Bearer ${accessToken};`,
      },
    });
    /*if (response.data.success == true) {
      //처리
    } else {
      alert("에러가 발생했습니다.");
    }*/
    return response.data.data;
  } catch (error) {
    console.error("Error get daily image user data", error);
    return null;
  }
};
export default getDailyImageUserData;
