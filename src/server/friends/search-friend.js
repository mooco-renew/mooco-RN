import axiosInstance from '../axios/axiosInstance';

// 친구 검색
    const searchFriends = async (keyword) => {
		try {
		  const response = await axiosInstance.get(`/api/v1/users/info`, {
            params: {
                page: 0,
                size: 10,
                keyword: keyword,
            },
          });
          if(response.data.success = true) {
		  console.log('검색 성공 !: ', response.data);
      return response.data;
          }
          else {
            console.log('검색 실패 !: ', response.data);
            return response.data;
          }
		} catch (error) {
		  console.error('검색 에러 ', error);
          return [];
		}
    };

export default searchFriends;