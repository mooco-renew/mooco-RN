import { SERVER_HOST } from "@env";
import axios from 'axios';

// 친구 요청하기
const changePw = async (email, password) => {
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/auth/password`, { 
            email: email,
            password: password,
          }, 
            {
                headers: { 
                'Content-Type': 'application/json'
                }
            },
          );
          if(response.data.success == true) {
            console.log('비밀번호 변경 성공!');
            return response.data;
          } else {
            console.log('비밀번호 변경 실패!', response.data)
            return response.data;
          }
        } catch (error) {
		  console.log('비밀번호 변경 에러', error);
      alert("error");
          return null;
		}
	  };

export default changePw;