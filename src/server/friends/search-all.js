import axiosInstance from '../axios/axiosInstance';

// 모든 유저 검색
    const searchAll = async (keyword) => {
      console.log(keyword);
		try {
		  const response = await axiosInstance.get(`/api/v1/users`, {
            params: {
                page: 0,
                size: 10,
                keyword: keyword,
            },
          });
          if(response.data.success = true) {
		  console.log('모든 유저 검색 성공 !: ', response.data);
      return response.data;
          }
          else {
            console.log('모든 유저 검색 실패 !: ', response.data);
            return response.data;
          }
		} catch (error) {
		  console.error('모든 유저 검색 에러 ', error);
          return [];
		}
    };

export default searchAll;