import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 요청 수락하기
const receiveFriend = async (userId) => {
    const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/users/request-accept`, { userId: userId}, 
            {
                headers: { 
                'Authorization': `Bearer ${value}`
                }
            },
          );
          if(response.data.success = true) {
          console.log('요청 수락 성공! : ', response);
          return response.data;
          } else {
            return response.data;
          }
        } catch (error) {
		  console.log('요청 수락 에러', error);
		}
	  };

export default receiveFriend;