import axiosInstance from '../axios/axiosInstance';

// 6-3. 마이페이지 나의 일상 디테일 조회(사진 X) 사용하지 않음
const getMyDailyDetailDate = async (year, month) => {

  try {
    const response = await axiosInstance.get(
      `/api/v1/users/monthly-barcode/details/date`,
      {
        params: {
          year: year,
          month: month,
        },
      }
    );
    console.log("일상 디테일 날짜 조회! : ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("일상 디테일 날짜 조회 에러 ", error);
    return [];
  }
};

export default getMyDailyDetailDate;
