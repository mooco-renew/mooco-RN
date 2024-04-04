import { SERVER_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// 일상 기록 가져오기!
const getDailyData = async (page = 0, size = 4) => {
  const accessToken = await AsyncStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `${SERVER_HOST}/api/v1/users/monthly-barcode`,
      {
        params: {
          page,
          size,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("일상 기록 조회! : ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("일상기록 조회 에러 ", error);
    return [];
  }
};


export default getDailyData;
