import { SERVER_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const postDailyBarcodeGenerate = async (year, month) => {
  const accessToken = await AsyncStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const requestBody = {
    year,
    month,
  };

  try {
    const response = await axios.post(
      `${SERVER_HOST}/api/v1/barcodes/daily?year=${year}&month=${month}`,
      {}, // 요청 본문으로 전송될 데이터
      config // axios 요청 설정
    );
    console.log("데일리 바코드 생성", response.data);
    /*if (response.data.success == true) {
      //처리
    } else {
      alert("에러가 발생했습니다.");
    }*/
  } catch (error) {
    console.error("Error post daily data", error);
  }
};

export default postDailyBarcodeGenerate;
