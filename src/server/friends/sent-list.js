import axiosInstance from '../axios/axiosInstance';

// 보낸 요청 조회
    const getSentList = async () => {
		try {
		  const response = await axiosInstance.get(`/api/v1/users/friends/request-sent`, {
            params: {
                page: 0,
                size: 10,
            },
          });
          if(response.data.success = true) {
		  console.log('보낸 요청 조회 성공! ', response.data);
      return response.data;
          } else {
            console.log('보낸 요청 조회 에러! : ', response.data);
            return response.data;
          }
		} catch (error) {
		  console.error('보낸 요청 조회 에러', error);
          return [];
		}
    };

export default getSentList;