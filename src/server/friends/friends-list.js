import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 목록 조회
    const getFriendsList = async () => {
        const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.get(`${SERVER_HOST}/api/v1/users/friends`, {
            params: {
                page: 0,
                size: 10,
            },
            headers: {
                'Authorization': `Bearer ${value}`
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
          return response.data;
		}
    };

export default getFriendsList;