import axiosInstance from '../axios/axiosInstance';

const postDailyBarcodeGenerate = async (year, month) => {

  const requestBody = {
    year,
    month,
  };

  try {
    const response = await axiosInstance.post(
      `/api/v1/barcodes/daily?year=${year}&month=${month}`,
      {}, // 요청 본문으로 전송될 데이터
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

export default postDailyBarcodeGenerate;
