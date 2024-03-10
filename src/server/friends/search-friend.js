import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 검색
    const searchFriends = async (keyword) => {
        const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.get(`${SERVER_HOST}/api/v1/users/friends/request-received`, {
            params: {
                page: 0,
                size: 10,
                keyword: keyword,
            },
            headers: {
                'Authorization': `Bearer ${value}`
              },
          });
		  console.log('검색 성공 !: ', response.data.data);
          return response.data.data;
		} catch (error) {
		  console.error('검색 에러 ', error);
          return [];
		}
    };

export default searchFriends;