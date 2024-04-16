import axiosInstance from '../axios/axiosInstance';

const sendRequest = async () => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/users/test`,
      {},
    );
    console.log("마이페이지 테스트 생성 : ", response.data);
    return response;
  } catch (error) {
    console.log("마이페이지 테스트 생성 에러 : ", error);
  }
};

export default sendRequest;
