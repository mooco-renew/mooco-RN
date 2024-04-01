import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 요청하기
const findId = async (email, code) => {
		
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/auth/userId`, { 
            email: email,
            code: code
          }, 
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            },
          );
          if(response.data.success == true) {
            console.log('아이디 찾기 성공!');
            return response.data;
          } else {
            console.log(response.data);
            return response.data;
          }
        } catch (error) {
		  console.log('아이디 찾기 에러', error);
      alert("error");
          return null;
		}
	  };

export default findId;