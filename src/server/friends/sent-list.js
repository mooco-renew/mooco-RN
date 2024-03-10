import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 보낸 요청 조회
    const getSentList = async () => {
        const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.get(`${SERVER_HOST}/api/v1/users/friends/request-sent`, {
            params: {
                page: 0,
                size: 10,
            },
            headers: {
                'Authorization': `Bearer ${value}`
              },
          });
		  console.log('보낸 요청 조회 성공! ', response.data.data);
          return response.data.data;
		} catch (error) {
		  console.error('보낸 요청 조회 에러', error);
          return [];
		}
    };

export default getSentList;