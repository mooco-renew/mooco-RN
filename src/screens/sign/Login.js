import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { validatePassword } from '../../util/sign/validate';
import HelpBox from '../../components/sign/helpBox';
import SocialButton from '../../components/sign/socialButton';
import SecureIcon from '../../components/sign/secureIcon';
import originLogin from '../../server/sign/login';

// test용 스크린
export default function Login() {
    const [id, setId] = useState(""); // 유저 정보
    const [pw, setPw] = useState("");
    const [isAvail, setIsAvail] = useState(false); // 전체 확인
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지
    const [isSecure, setIsSecure] = useState(true); // 비밀번호 숨기기/보이기 여부

        // 유효성 검사
        useEffect(() => {
          if(id != "" && pw != "" && validatePassword(pw)) {
            setIsAvail(true)
            setErrorMessage('');
          } else {
            if(pw != "") {
              if(!validatePassword(pw)) setErrorMessage('알파벳, 숫자, 특수문자를 포함하여 8자리 이상 작성해주세요.');
            }
            setIsAvail(false);
          }
        }, [id, pw]);

        const handleLogin = async () => {
          let data = await originLogin(id, pw); // 로그인
          if(data) {
            
          }
        }

    return (
      <View style={styles.container}>
    <View style={styles.inputbox}>
        <Text style={styles.firstlabel}>아이디</Text>
        <TextInput 
        value={id}
        style={styles.input}
        onChangeText={setId}
        placeholder='아이디를 입력해주세요.'
        placeholderTextColor='rgba(0, 0, 0, 0.3)'
        />
        <Text style={styles.secondlabel}>비밀번호</Text>
        <View style={styles.passwordcontainer}>
          <TextInput 
          value={pw}
          style={styles.input}
          onChangeText={setPw}
          placeholder='비밀번호를 입력해주세요.'
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          secureTextEntry={isSecure}/>
          <SecureIcon isSecure={isSecure} setIsSecure={setIsSecure}/>
          </View>
    </View>
    <Text style={styles.errortext}>{errorMessage}</Text>
    <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} disabled={!isAvail} onPress={() => handleLogin()}>
        <Text style={styles.buttontext}>확인</Text>
    </TouchableOpacity>
    <View style={styles.hrbox}>
      <View style={styles.hrstyle}>
      </View>
      <Text style={styles.hrboxtext}>
        또는
      </Text>
    </View>
    <SocialButton />
    <HelpBox />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    inputbox: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
    },
    firstlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontWeight: '800',
      marginBottom: 5,
      fontSize: 14,
      marginTop: 40,
    },
    secondlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontWeight: '800',
      marginBottom: 5,
      fontSize: 14,
      marginTop: 15,
    },
    input: {
      width: '90%',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#ffffff',
    },
    passwordcontainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    button: {
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 25,
    },
    buttondisable: {
      backgroundColor: 'rgba(217, 217, 217, 0.5)',
      color: 'rgba(21, 21, 21, 0.5)',
    },
    buttontext: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    hrbox: {
      marginTop: 15,
      width: '90%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    hrstyle: {
      borderBottomWidth: 1,
      marginTop: 10,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      width: '100%',
    },
    hrboxtext: {
      fontSize: 12,
      color: '#ffffff',
      backgroundColor: '#000000',
      marginTop: -10,
      paddingHorizontal: 15,
    },
    errortext: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontWeight: '400',
      marginBottom: 10,
      fontSize: 12,
      marginTop: 20,
      marginBottom: -10,
    },
  });