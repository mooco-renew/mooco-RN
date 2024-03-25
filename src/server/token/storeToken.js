import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (accessToken, refreshToken) => {
    try {
      if(accessToken != null && refreshToken != null) {
        await AsyncStorage.setItem("access_token", accessToken);
        await AsyncStorage.setItem("refresh_token", refreshToken);
      } else {
        console.log("빈 값입니다. ", error);  
      }
    } catch (error) {
      console.log("토큰 저장에 실패하였습니다. ", error);
    }
  };

  
  export default storeData;