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