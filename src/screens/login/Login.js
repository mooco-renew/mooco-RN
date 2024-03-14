import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { WEBCLIENTID, IOSCLIENTID } from "@env";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import GoogleLogoSvg from '../../assets/images/sign/googlelogo';
import KakaoLogoSvg from '../../assets/images/sign/kakaologo';
import postGoogleToken from '../../server/auth/postGoogleToken';
import { validateEmail, validatePassword } from '../../util/sign/validate';

// test용 스크린
export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [isAvail, setIsAvail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    GoogleSignin.configure({
      webClientId: WEBCLIENTID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      iosClientId: IOSCLIENTID,
    });

        // 유효성 검사
        useEffect(() => {
          if(email != "" && pw != "" && validateEmail(email) && validatePassword(pw)) {
            setIsAvail(true)
            setErrorMessage('');
          } else {
            if(email != "" || pw != "") {
              if(!validateEmail(email)) setErrorMessage('유효하지 않은 이메일 형식입니다.');
              else if(!validatePassword(pw)) setErrorMessage('알파벳, 숫자, 특수문자를 포함하여 8자리 이상 작성해주세요.');
            }
            setIsAvail(false);
          }
        }, [email, pw]);

        // 유저가 맞는 지 검사
    const isUser = () => {

    }

    return (
      <View style={styles.container}>
    <View style={styles.inputbox}>
        <Text style={styles.firstlabel}>이메일</Text>
        <TextInput 
        value={email}
        style={styles.input}
        onChangeText={setEmail}/>
        <Text style={styles.secondlabel}>비밀번호</Text>
        <TextInput 
        value={pw}
        style={styles.input}
        onChangeText={setPw}
        secureTextEntry={true}/>
    </View>
    <Text style={styles.errortext}>{errorMessage}</Text>
    <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} disabled={!isAvail}>
        <Text style={styles.buttontext}>확인</Text>
    </TouchableOpacity>
    <View style={styles.hrbox}>
      <View style={styles.hrstyle}>
      </View>
      <Text style={styles.hrboxtext}>
        또는
      </Text>
      <View style={styles.socialcontainer}>
      <TouchableOpacity onPress={
        async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const data_ = await GoogleSignin.signIn();
            const data = await GoogleSignin.getTokens();
            console.log('token : ', data.accessToken, '기타 데이터 : ', data_);
            postGoogleToken(data.accessToken, navigation);
            // postGoogle(data.accessToken); // google api userinfo 발급용
          } catch (error) {
            console.log('실패 ', error);
          }
        }
      }>
          <GoogleLogoSvg />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('KakaoLogin')}>
          <KakaoLogoSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.helptextbox}>
      <Text style={styles.helptext}>
        아이디 찾기
      </Text>
      <Text style={styles.helptextline}>|</Text>
      <Text style={styles.helptext}>
        비밀번호 찾기
      </Text>
      </View>
    </View>
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
      marginBottom: 10,
      fontSize: 14,
      marginTop: 40,
    },
    secondlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontWeight: '800',
      marginBottom: 10,
      fontSize: 14,
      marginTop: 15,
    },
    input: {
      width: '90%',
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
      marginTop: 20,
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