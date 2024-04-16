import axiosInstance from '../axios/axiosInstance';

// 일상 기록 가져오기!
const getDailyData = async (page = 0, size = 4) => {

  try {
    const response = await axiosInstance.get(
      `/api/v1/users/monthly-barcode`,
      {
        params: {
          page,
          size,
        },
      }
    );
    console.log("일상 기록 조회! : ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("일상기록 조회 에러 ", error);
    return [];
  }
};


export default getDailyData;
