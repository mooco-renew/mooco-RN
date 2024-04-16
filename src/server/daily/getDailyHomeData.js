import axiosInstance from '../axios/axiosInstance';

const getDailyHomeData = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/days/calendar`);
    /*if (response.data.success == true) {
      //처리
    } else {
      alert("에러가 발생했습니다.");
    }*/
    return response.data.data;
  } catch (error) {
    console.error("Error get daily data", error);
    return null;
  }
};
export default getDailyHomeData;
