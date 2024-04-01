import axiosInstance from '../axios/axiosInstance';

// 친구 요청 수락하기
const receiveFriend = async (userId) => {
		try {
		  const response = await axiosInstance.post(`/api/v1/users/request-accept`, { userId: userId}, );
          if(response.data.success = true) {
          console.log('요청 수락 성공! : ', response);
          return response.data;
          } else {
            console.log('요청 수락 실패! : ', response);
            return response.data;
          }
        } catch (error) {
		  console.log('요청 수락 에러', error);
		}
	  };

export default receiveFriend;