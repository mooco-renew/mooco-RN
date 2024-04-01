import axiosInstance from '../axios/axiosInstance';

// 친구 요청하기
const sendRequest = async (userId) => {		
		try {
		  const response = await axiosInstance.post(`/api/v1/users/request`, { userId: userId}, );
          if(response.data.success = true) {
          console.log('친구 요청 성공! : ', response.data);
          return response.data;
          } else {
            console.log('친구 요청 실패! : ', response.data);
            return response.data;
          }
        } catch (error) {
		  console.log('친구 요청 에러', error);
		}
	  };

export default sendRequest;