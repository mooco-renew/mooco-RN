import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_HOST } from "@env";

const deleteEventBarcode = async (eventId) => {
  const accessToken = await AsyncStorage.getItem("access_token");
  try {
    const response = await axios.delete(
      `${SERVER_HOST}/api/v1/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      return { data: response.data.data };
    } else {
      return {
        error: {
          code: response.data.error.code,
          message: response.data.error.message,
        },
      };
    }
  } catch (error) {
    console.error("바코드 삭제 에러", error);
    return null;
  }
};

export default deleteEventBarcode;
