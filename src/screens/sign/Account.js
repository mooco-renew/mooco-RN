import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEBCLIENTID, IOSCLIENTID } from "@env";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { validateEmail, validatePassword } from '../../util/sign/validate';
import SocialButton from '../../components/sign/socialButton';
import EmailAuth from '../../components/auth/emailAuth';
import SecureIcon from '../../components/sign/secureIcon';
import originAccount from '../../server/sign/account';
import requestEmail from '../../server/auth/emailAuth';
import CustomActionSheet from '../../components/sheet/actionSheet';
import Term from '../../components/sheet/term';

// test용 스크린
export default function Account() {
    const navigation = useNavigation();

    const [email, setEmail] = useState(""); // 유저 정보들
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [isSecure, setIsSecure] = useState(true); // 비밀번호 숨기기/보이기 여부

    const [isAvail, setIsAvail] = useState(true); // 인증번호 클릭 허가 상태
    const [step, setStep] = useState(1); // 페이지 전환, 1 : id,pw,email 입력, 2 : 약관 동의, 3 : 이메일 인증 
    const [terms, setTerms] = useState(0); // 약관동의 페이지 전환, 1 : 이용 약관, 2 : 개인정보 약관
    const [check, setCheck] = useState([false, false]); // 이용약관 동의 현황
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지

    GoogleSignin.configure({
      webClientId: WEBCLIENTID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      iosClientId: IOSCLIENTID,
    });

    // 유효성 검사
    useEffect(() => {
      if(validatePassword(pw) && validateEmail(email)) {
        setErrorMessage('');
        setIsAvail(true);
      } else {
        setIsAvail(false);
          if(email != "" && !validateEmail(email)) setErrorMessage("올바른 이메일 형식으로 작성해주세요.");
          else if(pw != "" && !validatePassword(pw)) setErrorMessage('알파벳, 숫자, 특수문자를 포함하여 8자리 이상 작성해주세요.');
          else {
            setErrorMessage("");
          }
      }
    }, [pw, email]);

    return (
      <View style={styles.container}>
        {terms == 1 && <Term id={1} setTerm={setTerms} setCheck={setCheck}/>}
        {terms == 2 && <Term id={2} setTerm={setTerms} setCheck={setCheck}/>}
        {terms == 0 && <CustomActionSheet isOpen={step == 2} setStep={setStep} setTerm={setTerms} check={check} email={email}/>}
        {(step == 1 || step == 2)&& (
          <View style={styles.container}>
            <Text style={styles.introduce}>정보가 맞다면{'\n'}인증하기 버튼을 눌러주세요.</Text>
         <View style={styles.inputbox}>
         <Text style={styles.firstlabel}>이메일</Text>
          <TextInput 
          value={email}
          style={styles.input}
          onChangeText={setEmail}
          placeholder='이메일을 입력해주세요.'
          placeholderTextColor='rgba(0, 0, 0, 0.3)'
          />
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
      <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} onPress={() => setStep(2)} disabled={!isAvail}>
          <Text style={styles.buttontext}>인증하기</Text>
      </TouchableOpacity>
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
        {step == 3 && <EmailAuth by='account' email={email} id={id} pw={pw} setStep={setStep}/>}
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
    introduce: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontWeight: '800',
      fontSize: 20,
      marginTop: 20,
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
      marginTop: 30,
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
      marginTop: 30,
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
    socialtext: {
      marginTop: 40,
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