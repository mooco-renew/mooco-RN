import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";

// 친구 요청 거절하기
const refuseFriend = async (userId) => {
    const value = await AsyncStorage.getItem('access_token');

    try {
        const response = await axios.delete(`${SERVER_HOST}/api/v1/users/friends`, {
            headers: {
                'Authorization': `Bearer ${value};`
            },
            params: {
                userId: userId, 
            },
        });
        if(response.data.success = true) {
        console.log('요청 거절 성공!: ', response);
        return response.data.success;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('요청 거절 에러: ', error);
    }
};

export default refuseFriend;
