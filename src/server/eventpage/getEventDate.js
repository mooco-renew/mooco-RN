import axiosInstance from '../axios/axiosInstance';

const getDailyHomeData = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/events`, {
      headers: {
        Authorization: `Bearer ${accessToken};`,
      },
    });
    console.log("그룹 이벤트 데이터 로드", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error get group calendar data", error);
    return null;
  }
};
export default getDailyHomeData;
