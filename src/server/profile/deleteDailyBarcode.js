import axiosInstance from '../axios/axiosInstance';

const deleteDailyBarcode = async (barcodeId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/barcodes/${barcodeId}/daily`);

    if (response.data.success) {
      return { data: response.data };
    } else {
      return {
        error: {
          code: response.data.error.code,
          message: response.data.error.message,
        },
      };
    }
  } catch (error) {
    console.error("바코드 삭제 에러", error);
    return { error: { code: -1, message: "네트워크 오류" } };
  }
};

export default deleteDailyBarcode;
