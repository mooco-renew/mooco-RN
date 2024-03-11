import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_HOST } from "@env";
import axios from "axios";
import { Platform } from "react-native";

const postUserInfo = async (image, nickname, navigation) => {
  console.log("image : ", image, "nickname : ", nickname);
  const value = await AsyncStorage.getItem("access_token");
  const formData = new FormData();
  // 이미지 용량이 너무 커서 압축이 필요하다.
  // 안드는 jpeg, ios는 jpg로 고정
  const file = {
    name: image[0],
    type: Platform.OS === "android" ? "image/jpeg" : "image/jpg",
    uri: image[2],
  };

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
      `${SERVER_HOST}/api/v1/auth/user-info`,
      formData,
      config
    );
    if (response.data.success == true) {
      navigation.navigate("Home"); // 우선 daliy로 이동
    } else {
      alert("에러가 발생했습니다. 이미지를 다시 보내주세요.");
    }
  } catch (error) {
    console.log("에러가 있습니다. ", error);
  }
};

export default postUserInfo;
