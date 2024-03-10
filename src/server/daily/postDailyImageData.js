import { SERVER_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const postDailyImageData = async (date, images, memo) => {
  const accessToken = await AsyncStorage.getItem("access_token");
  const formData = new FormData();
  const files = [];
  for (let i = 0; i < images.length; i++) {
    files.push({
      name: "photos",
      type: Platform.OS === "android" ? "image/jpeg" : "image/jpg",
      uri: images[i],
    });
    formData.append("photos", files[i]);
  }
  formData.append("memo", memo);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${SERVER_HOST}/api/v1/days/${date}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      formData,
      config
    );
    console.log(response.data.data);
    /*if (response.data.success == true) {
      //처리
    } else {
      alert("에러가 발생했습니다.");
    }*/
  } catch (error) {
    console.error("Error get daily data", error);
  }
};

export default postDailyImageData;
