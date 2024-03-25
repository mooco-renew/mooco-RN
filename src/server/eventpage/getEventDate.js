import { SERVER_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getDailyHomeData = async () => {
  const accessToken = await AsyncStorage.getItem("access_token");
  try {
    const response = await axios.get(`${SERVER_HOST}/api/v1/events`, {
      headers: {
        Authorization: `Bearer ${accessToken};`,
      },
    });
    console.log("그룹 이벤트 데이터 로드", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error get group calendar data", error);
    return null;
  }
};
export default getDailyHomeData;
