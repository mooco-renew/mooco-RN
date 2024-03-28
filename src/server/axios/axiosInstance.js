import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_HOST } from "@env";

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
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    try {
        const response = await axios.post(`${SERVER_HOST}/api/v1/auth/reissue`, {
          refreshToken: refreshToken,
        });
  
        if (response.data.success === 200) {
            // 새로운 토큰 세팅
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;
          await AsyncStorage.setItem('access_token', newAccessToken);
          await AsyncStorage.setItem('refresh_token', newRefreshToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  
          // 원본 요청에 새 accessToken 설정 후 재요청
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.log('AccessToken 갱신 실패:', refreshError);
        // 토큰 갱신 실패 시
        return Promise.reject(refreshError);
      }
  }
  return Promise.reject(error);
});

export default axiosInstance;
