import axiosInstance from '../axios/axiosInstance';

// 프로필 데이터 GET!
const getProfileData = async (friendId = null) => {
  try {
    const endpoint = friendId
      ? `/api/v1/users/${friendId}/my-page`
      : "/api/v1/users/my-page";
    const response = await axiosInstance.get(`${endpoint}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("프로필 조회 에러", error);
    return null;
  }
};

export default getProfileData;
