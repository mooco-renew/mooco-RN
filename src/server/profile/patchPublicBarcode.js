import { SERVER_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// 데일리 바코드 공개/비공개 전환
const pathchPublicBarcode = async (barcodeId, isPrivate) => {
  const accessToken = await AsyncStorage.getItem("access_token");

  try {
    const response = await axios.patch(
      `${SERVER_HOST}/api/v1/barcodes/${barcodeId}/private`,
      { isPrivate: isPrivate },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("데일리 바코드 전환 : ", response.data);
    return response.data;
  } catch (error) {
    console.error("바코드 전환 에러 ", error);
    return [];
  }
};

export default pathchPublicBarcode;
