import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 목록 조회
    const getFriendsList = async () => {
        const [data, setData] = useState(null);
        const value = await AsyncStorage.getItem('access_token');
		
		try {
		  const response = await axios.get(`${SERVER_HOST}/api/v1/users/friends`, {
            params: {
                page: 0,
                size: 10,
            },
            headers: {
                'Authorization': `Bearer ${value};`
              },
          });
		  console.log('성공 !: ', response.data.data);
          return response.data.data;
		} catch (error) {
		  console.error('에러가 있습니다. ', error);
          return null;
		}
    };

export default getFriendsList;