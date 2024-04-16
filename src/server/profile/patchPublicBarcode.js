import axiosInstance from '../axios/axiosInstance';

// 데일리 바코드 공개/비공개 전환
const pathchPublicBarcode = async (barcodeId, isPrivate) => {

  try {
    const response = await axiosInstance.patch(
      `/api/v1/barcodes/${barcodeId}/private`,
      { isPrivate: isPrivate },
    );
    console.log("데일리 바코드 전환 : ", response.data);
    return response.data;
  } catch (error) {
    console.error("바코드 전환 에러 ", error);
    return [];
  }
};

export default pathchPublicBarcode;
