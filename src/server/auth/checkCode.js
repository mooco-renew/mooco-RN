import { SERVER_HOST } from "@env";
import axios from 'axios';

// 이메일 코드 확인
const checkCode = async (email, code) => {
		
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
            console.log('코드 인증 성공!');
            return response.data.success;
          } else {
            return response.data.error;
          }
        } catch (error) {
		  console.log('코드 인증 에러', error);
          return null;
		}
	  };

export default checkCode ;