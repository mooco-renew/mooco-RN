import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Checkbox from 'expo-checkbox';
import { WEBCLIENTID, IOSCLIENTID } from "@env";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { validateEmail, validatePassword } from '../../util/sign/validate';
import SocialButton from '../../components/sign/socialButton';
import EmailAuth from '../../components/auth/emailAuth';
import { allTrue, firstTrue, lastFalse, secondTrue, thirdTrue } from '../../util/auth/authStep';
import SecureIcon from '../../components/sign/secureIcon';
import originAccount from '../../server/sign/account';
import { setNewTrueArray } from '../../util/array/newTrueArray';
import requestEmail from '../../server/auth/emailAuth';
import CustomAlert from '../../components/alert/\bcustomAlert';

// test용 스크린
export default function Account({ route }) {
    const navigation = useNavigation();

    const [email, setEmail] = useState(""); // 유저 정보들
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const [code, setCode] = useState(0); // 인증 코드용
    const [auth, setAuth] = useState([false, false]); // 이용약관, 이메일 인증, 전체
    const [isShow, setIsShow] = useState(false); // 인증 화면 열고 닫기
    const [isAvail, setIsAvail] = useState(false); // 회원가입 가능 여부
    const [isSecure, setIsSecure] = useState(true); // 비밀번호 숨기기/보이기 여부

    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지

    GoogleSignin.configure({
      webClientId: WEBCLIENTID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      iosClientId: IOSCLIENTID,
    });

    // navigation으로 보낸 params 받기
    useEffect(() => {
      if(route.params != undefined) {
        const { _checked } = route.params;
        if(_checked === true) {setNewTrueArray(setAuth, 0)} // 이용약관에 동의 했다면
      }
    }, [route.params])

    // 유효성 검사
    useEffect(() => {
      if(validatePassword(pw) && validateEmail(email) && firstTrue(auth) && secondTrue(auth)) {
        setErrorMessage('');
        setIsAvail(true);
      } else {
          if(email != "" && !secondTrue(auth)) setErrorMessage("이메일 인증을 완료해주세요.");
          else if(pw != "" && !validatePassword(pw)) setErrorMessage('알파벳, 숫자, 특수문자를 포함하여 8자리 이상 작성해주세요.');
          else if(pw != "" && email != "" && !firstTrue(auth)) setErrorMessage("이용약관에 동의해주세요.");
          setIsAvail(false);
      }
      if(auth[1] === true) { // 이메일 인증 후 돌아올 시, 인증 화면 닫기
        setIsShow(false);
      }
    }, [id, pw, auth]);

// 회원가입 클릭
    const cilckAccount = async () => {
      let data = await originAccount(email, id, pw, navigation);
      if(data.success == false) {

      }
    }

    // 인증번호 전송
    const sendEmail = async () => {
      let data = await requestEmail(email); // 이메일 인증 코드 발송 api
      if(data == true) { setIsShow(true); } // 화면 표사
    }

    return (
      <View style={styles.container}>
        {!isShow && (
          <View style={styles.container}>
         <View style={styles.inputbox}>
         <Text style={styles.firstlabel}>이메일</Text>
          <View style={styles.authcontainer}>
          <TextInput 
          value={email}
          style={styles.emailinput}
          onChangeText={setEmail}
          placeholder='이메일을 입력해주세요.'
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          />
      <TouchableOpacity style={[styles.emailbutton, (!validateEmail(email) || secondTrue(auth)) && styles.buttondisable]} onPress={() => sendEmail()} disabled={!validateEmail(email) || secondTrue(auth)}>
          <Text style={styles.emailbuttontext}>{secondTrue(auth) ? "완료" : "인증"}</Text>
      </TouchableOpacity>
          </View>
          <Text style={styles.secondlabel}>아이디</Text>
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
      <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} onPress={() => cilckAccount()} disabled={!isAvail}>
          <Text style={styles.buttontext}>확인</Text>
      </TouchableOpacity>
    <View style={styles.checkcontainer}>
      <Checkbox
            style={[styles.checkbox, secondTrue(auth) && styles.checkboxdisble]}
            value={firstTrue(auth)}
            onValueChange={() => navigation.navigate('Agreement', { id: id, pw: pw })}
            color={firstTrue(auth) ? '#000000' : undefined}
            disabled={firstTrue(auth)}
          />
      <Text style={styles.checktext}>가입과 동시에 이용 약관 및 개인정보 처리방침에 동의합니다.</Text>
      </View>
      <Text style={styles.socialtext}>소셜 계정으로 가입하기</Text>
      <SocialButton />
      <View style={styles.helptextbox}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.helptext}>
        로그인
      </Text>
      </TouchableOpacity>
      </View>
        </View>
        )}
        {isShow && <EmailAuth email={email} setShowAuth={setAuth} setCode={setCode}/>}
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
    authcontainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-between',
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
    emailinput: {
      width: '85%',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#ffffff',
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
    emailbutton: {
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10, // 상하 패딩 
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    emailbuttontext: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
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
    checkcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginTop: 10,
    },
    checktext: {
      fontSize: 12,
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '600',
      marginLeft: 5,
    },
    checkbox: {
      width: 20,
      height: 20,
      marginRight: 5,
      borderRadius: 10,
    },
    checkboxdisble: {
      width: 20,
      height: 20,
      marginRight: 5,
      borderRadius: 10,
    },
    socialtext: {
      marginTop: 20,
      fontSize: 14,
      fontWeight: '600',
      color: '#ffffff',
    },
    helptextbox: {
      alignItems: 'center',
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
    },
    helptext: {
      fontSize: 12,
      color: '#ffffff',
      marginTop: 15,
    },
    helptextline: {
      marginHorizontal: 7,
      fontSize: 12,
      color: '#ffffff',
      marginTop: 15,
    },
    socialcontainer: {
      flexDirection: 'row',
      width: '32%',
      alignItems: 'center',
      marginTop: 30,
      justifyContent: 'space-between',
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