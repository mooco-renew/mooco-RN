import axiosInstance from '../axios/axiosInstance';
import { Platform } from "react-native";

const postDailyImageData = async (date, images, memo) => {
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
    },
  };
  try {
    const response = await axiosInstance.post(
      `/api/v1/days/${date}`,
      formData,
      config
    );
    return response.data;
    /*if (response.data.success == true) {
      //처리
    } else {
      alert("에러가 발생했습니다.");
    }*/
  } catch (error) {
    console.error("Error post daily data", error);
    return null;
  }
};

export default postDailyImageData;
