import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_HOST } from "@env";
import axios from "axios";

const sendRequest = async () => {
  const accessToken = await AsyncStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${SERVER_HOST}/api/v1/users/test`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("마이페이지 테스트 생성 : ", response.data);
    return response;
  } catch (error) {
    console.log("마이페이지 테스트 생성 에러 : ", error);
  }
};

export default sendRequest;
