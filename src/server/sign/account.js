import { SERVER_HOST } from "@env";
import axios from 'axios';
import storeData from "../token/storeToken";
import ErrorMessageModal from "../../components/alert/\bcustomAlert";

// 서버로 코드 전송 후 토큰 받아오기
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

      if(response.data.success == true) {
        console.log('회원가입 성공!');
        navigation.navigate("GetProfile"); // true라면 추가 정보 기입으로 이동)
      } else {
        console.log('회원가입 실패!');
       return response.data; 
      }
    } catch (error) {
      console.error("회원가입 에러가 있습니다. ", error);
    }
  };

export default originAccount;