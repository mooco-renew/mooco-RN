import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 요청하기
const requestEmail = async (email) => {

		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/auth/email`, { 
            email: email,
          }, 
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            },
          );
          if(response.data.success == true) {
            console.log('이메일 요청 성공!', response.data);
            return response.data.success;
          } else {
            console.log('이메일 요청 실패', response.data);
            return response.data.error;
          }
        } catch (error) {
		  console.log('이메일 요청 에러', error);
      alert("error");
          return null;
		}
	  };

export default requestEmail;