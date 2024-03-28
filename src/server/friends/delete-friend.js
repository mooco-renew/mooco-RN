import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";

// 친구 삭제 api
const deleteFriend = async (userId) => {
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
        console.log('친구 삭제 성공! ', response.data);
        return response.data.success;
        }
        else {
        return response.data;
        }
    } catch (error) {
        console.error('친구 삭제 에러: ', error);
        return null;
    }
};

export default deleteFriend;
