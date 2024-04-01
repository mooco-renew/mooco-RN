import { Platform } from "react-native";
import axiosInstance from "../axios/axiosInstance";

const postUserInfo = async (image, nickname, navigation) => {
  const formData = new FormData();
  // 이미지 용량이 너무 커서 압축이 필요하다.
  // 안드는 jpeg, ios는 jpg로 고정

  if(image != null) {
    file = {
      name: image[0],
      type: Platform.OS === "android" ? "image/jpeg" : "image/jpg",
      uri: image[2],
    };
  } else {
    file = null;
  }

  formData.append("profileImage", file);
  formData.append("nickname", nickname);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axiosInstance.post(
      `/api/v1/auth/user-info`,
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
