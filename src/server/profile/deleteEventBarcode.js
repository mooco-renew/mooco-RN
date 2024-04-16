import axiosInstance from '../axios/axiosInstance';

const deleteEventBarcode = async (eventId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/events/${eventId}`);

    if (response.data.success) {
      return { data: response.data.data };
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
    return null;
  }
};

export default deleteEventBarcode;
