import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";

// 친구 요청 취소
const cancleRequest = async (userId) => {
    const value = await AsyncStorage.getItem('access_token');

    try {
        const response = await axios.delete(`${SERVER_HOST}/api/v1/users/${userId}/friends`, {
            headers: {
                'Authorization': `Bearer ${value};`
            },
        });
        if(response.data.success = true) {
        console.log('요청 취소 성공! ', response.data);
        return response.data;
        }
        else {
        console.log('요청 취소 실패! ', response.data);
        return response.data;
        }
    } catch (error) {
        console.error('요청 취소 에러: ', error);
        return null;
    }
};

export default cancleRequest;
