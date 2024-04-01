import axiosInstance from '../axios/axiosInstance';

// 친구 요청 거절하기
const refuseFriend = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/users/friends`, {
            params: {
                userId: userId, 
            },
        });
        if(response.data.success = true) {
        console.log('요청 거절 성공!: ', response.data);
        return response.data;
        } else {
            console.log('요청 거절 실패! : ', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('요청 거절 에러: ', error);
    }
};

export default refuseFriend;
