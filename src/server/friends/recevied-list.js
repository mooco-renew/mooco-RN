import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 받은 요청 조회
    const getReceviedList = async () => {
        const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.get(`${SERVER_HOST}/api/v1/users/friends/request-received`, {
            params: {
                page: 0,
                size: 10,
            },
            headers: {
                'Authorization': `Bearer ${value}`
              },
          });
		  console.log('성공 !: ', response.data.data);
          return response.data.data;
		} catch (error) {
		  console.error('에러가 있습니다. ', error);
          return [];
		}
    };

export default getReceviedList;