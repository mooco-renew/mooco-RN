import { SERVER_HOST } from "@env";
import axios from 'axios';

// 이메일 코드 확인
const checkCode = async (email, code) => {
		console.log(email, code);
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/auth/verification`, { 
            email: email,
            code: code,
          }, 
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            },
          );
          if(response.data.success == true) {
            console.log('코드 인증 성공!', response.data);
            return response.data;
          } else {
            console.log('코드 인증 실패!', response.data);
            return response.data;
          }
        } catch (error) {
		  console.log('코드 인증 에러', error);
      alert("error");
          return null;
		}
	  };

export default checkCode ;