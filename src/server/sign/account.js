import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from "../token/storeToken";

// 일반 회원가입
const originAccount = async (email, id, pw, navigation) => {
    const data = {
      email: email,
      id: id,
      password: pw,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_HOST}/api/v1/auth/default`,
        data,
        config
      );
      console.log(response.data);

      if(response.data.success == true) {
        console.log('회원가입 성공!', response.data);
        storeData(response.data.data.accessToken, response.data.data.refreshToken);
        navigation.navigate("GetProfile"); // true라면 추가 정보 기입으로 이동)
        return response.data; 
      } else {
        console.log('회원가입 실패!', response.data);
       return response.data; 
      }
    } catch (error) {
      console.error("회원가입 에러가 있습니다. ", error);
      alert("error");
    }
  };

export default originAccount;