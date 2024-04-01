import axiosInstance from '../axios/axiosInstance';

// 받은 요청 조회
    const getReceviedList = async () => {
		try {
		  const response = await axiosInstance.get(`/api/v1/users/friends/request-received`, {
            params: {
                page: 0,
                size: 10,
            },
          });
          if(response.data.success = true) {
		  console.log('받은 요청 조회 성공! : ', response.data);
      return response.data;
          }
          else {
            console.log('받은 요청 조회 실패! : ', response.data);
            return response.data;
          }
		} catch (error) {
		  console.error('받은 요청 조회 에러', error);
          return response.data;
		}
    };

export default getReceviedList;