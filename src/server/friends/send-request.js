import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 요청하기
const sendRequest = async (userId) => {
    const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/users/request`, { userId: userId}, 
            {
                headers: { 
                'Authorization': `Bearer ${value}`
                }
            },
          );
          if(response.data.success = true) {
          console.log('친구 요청 성공! : ', response);
          return response.data.success;
          } else {
            return response.data;
          }
        } catch (error) {
		  console.log('친구 요청 에러', error);
		}
	  };

export default sendRequest;