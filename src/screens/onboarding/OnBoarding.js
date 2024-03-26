import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image  } from 'react-native';
import { WEBCLIENTID, IOSCLIENTID } from "@env";
import GoogleButtonSvg from '../../assets/images/sign/googlebutton';
import KakaoButtonSvg from '../../assets/images/sign/kakaobutton';
import isThereToken from '../../server/token/isThereToken';
import postGoogleToken from '../../server/sign/postGoogleToken';
import getNewToken from '../../server/token/getNewToken';

// gif code
// <Image source={require('../../assets/images/test.gif')} style={{ width: 200, height: 200 }} />

export default function OnBoarding() {
    const navigation = useNavigation();
    const data = isThereToken();

    GoogleSignin.configure({
      webClientId: WEBCLIENTID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      iosClientId: IOSCLIENTID,
    });

    return (
      <View style={styles.container}>
        <View style={styles.center}>
        <Image source={require('../../assets/images/onboarding/mooco.gif')} style={{ width: 300, height: 290 }} />
        <Text style={styles.firsttext}>
            나만의 무드 바코드
        </Text>
        </View>
        <TouchableOpacity style={styles.firstbutton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttontext}>일반 로그인</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.secondbutton} onPress={() => navigation.navigate('KakaoLogin')}>
        <KakaoButtonSvg />
    </TouchableOpacity>
    <TouchableOpacity style={styles.thirdbutton} onPress={
      async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const isSignedIn = await GoogleSignin.isSignedIn();
          if (!isSignedIn) {
            await GoogleSignin.signIn();
          } 
          const data = await GoogleSignin.getTokens(); // 토큰을 얻습니다.
          console.log('token : ', data.accessToken);
          postGoogleToken(data.accessToken, navigation);
        } catch (error) {
          console.log('실패 ', error);
        } 
      }
    }>
        <GoogleButtonSvg />
    </TouchableOpacity>
      </View>
    );
  }
  
  const screenHeight = Dimensions.get('window').height;
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    firsttext: {
      width: '60%',
      fontSize: 20,
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center',
      marginTop: -90,
    },
    firstbutton: {
      top: 80,
      backgroundColor: '#151515',
      width: 254,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderColor: '#ffffff',
      borderWidth: 1,
    },
    buttontext: {
      color: '#ffffff',
      fontSize: 14,
    },
    secondbutton: {
      top: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thirdbutton: {
      top: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });