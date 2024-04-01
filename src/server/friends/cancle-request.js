import axiosInstance from '../axios/axiosInstance';

// 친구 요청 취소
const cancleRequest = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/users/${userId}/friends`);
        if(response.data.success = true) {
        console.log('요청 취소 성공! ', response.data);
        return response.data;
        }
        else {
        console.log('요청 취소 실패! ', response.data);
        return response.data;
        }
    } catch (error) {
        console.error('요청 취소 에러: ', error);
        return null;
    }
};

export default cancleRequest;
