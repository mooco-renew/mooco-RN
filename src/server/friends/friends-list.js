import axiosInstance from '../axios/axiosInstance';

// 친구 목록 조회
    const getFriendsList = async () => {
		try {
		  const response = await axiosInstance.get(`/api/v1/users/friends`, {
            params: {
                page: 0,
                size: 10,
            },
          });
          if(response.data.success = true) {
		  console.log('친구 목록 조회 성공! : ', response.data);
      return response.data;
          }
          else {
            console.log('친구 목록 조회 실패! : ', response.data);
          return response.data;
          }
		} catch (error) {
		  console.error('친구 목록 조회 에러 ', error);
          return [];
		}
    };

export default getFriendsList;