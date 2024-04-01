import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";
import { navigate } from '../../services/navigation/NavigationService';

// 보유 accessToken 만료 시, refresh로 발급한 후 다시 요청을 전송하는 axios instance이다.
const axiosInstance = axios.create({
  baseURL: SERVER_HOST
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token'); // access_token
  // header에 자동으로 붙이기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 40101 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    console.log('refresh : ', refreshToken);
    try {
      const headers = {
        'ReAuthorization': `Bearer ${refreshToken}`
      };

        const response = await axios.post(`${SERVER_HOST}/api/v1/auth/reissue`, { headers });
  
        if (response.data.success === true) {
          console.log('새 토큰 발급 성공');
            // 새로운 토큰 세팅
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;
          await AsyncStorage.setItem('access_token', newAccessToken);
          await AsyncStorage.setItem('refresh_token', newRefreshToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  
          // 원본 요청에 새 accessToken 설정 후 재요청
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else if(response.data.error.code === 40101){
          console.log('refresh 토큰 만료로 새 토큰 발급 실패');
          // refreshToken 만료 혹은 재발급 실패
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        // 로그인 페이지로 리다이렉트
        navigate('OnBoarding');
        return Promise.reject(error);
        } else {
          console.log('토큰 발급 실패');
        }
      } catch (refreshError) {
        console.log('axios 에러 발생', refreshError);
      // 토큰 갱신 실패 시, 로그인 페이지로 리다이렉트
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      navigate('OnBoarding');
      return Promise.reject(refreshError);
      }
  }
  return Promise.reject(error);
});

export default axiosInstance;
