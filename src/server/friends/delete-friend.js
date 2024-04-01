import axiosInstance from '../axios/axiosInstance';

// 친구 삭제 api
const deleteFriend = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/users/friends`, {
            params: {
                userId: userId, 
            },
        });
        if(response.data.success = true) {
        console.log('친구 삭제 성공! ', response.data);
        return response.data;
        }
        else {
        console.log('친구 삭제 실패! ', response.data);
        return response.data;
        }
    } catch (error) {
        console.error('친구 삭제 에러: ', error);
        return null;
    }
};

export default deleteFriend;
