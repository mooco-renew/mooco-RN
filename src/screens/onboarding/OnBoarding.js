import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { WEBCLIENTID, IOSCLIENTID } from "@env";
import GoogleButtonSvg from '../../assets/images/sign/googlebutton';
import KakaoButtonSvg from '../../assets/images/sign/kakaobutton';
import BarcordSvg from '../../assets/images/onboarding/barcord'
import MoocoSvg from '../../assets/images/onboarding/mooco'
import isThereToken from '../../server/token/isThereToken';
import postGoogleToken from '../../server/sign/postGoogleToken';

// gif code
// <Image source={require('../../assets/images/test.gif')} style={{ width: 200, height: 200 }} />

export default function OnBoarding() {
    const navigation = useNavigation();

    const location = async () => {
      let data = await isThereToken();
      if(data == true) {
        navigation.navigate('Home');
      } else if(data == false) {

      } else {
        
      }
    }
    
    const first = new Animated.Value(1);
    const second = new Animated.Value(0);
    const third = new Animated.Value(0);
    const moveUp = new Animated.Value(100);
    const [step, setStep] = useState(1);
    console.log(step);

      // 첫 번째 애니메이션: step 1
  useEffect(() => {
    if (step === 1) {
      Animated.timing(first, {
        toValue: 0,
        delay: 1600,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setStep(2)); // 첫 번째 애니메이션 완료 후 step 업데이트
    }
  }, [step, first]);

  // 두 번째 애니메이션: step 2
  useEffect(() => {
    if (step === 2) {
      Animated.sequence([
        // 첫 번째 애니메이션: 나타나기
        Animated.timing(second, {
          toValue: 1, // 투명도를 1로 설정하여 요소를 나타나게 함
          delay: 0, // 시작 전 딜레이
          duration: 400, // 지속 시간
          useNativeDriver: true,
        }),
        // 두 번째 애니메이션: 사라지기
        Animated.timing(second, {
          toValue: 0, // 투명도를 0으로 설정하여 요소를 사라지게 함
          delay: 1600, // 시작 전 딜레이
          duration: 400, // 지속 시간
          useNativeDriver: true,
        }),
      ]).start(() => setStep(3)); // 애니메이션 시퀀스 완료 후 step 업데이트
    }
  }, [step, second]);

  // 세 번째 애니메이션 (병렬 실행): step 3
  useEffect(() => {
    if (step === 3) {
      location();
      Animated.parallel([
        Animated.timing(third, {
          toValue: 1,
          delay: 400,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(moveUp, {
          toValue: 0,
          delay: 400,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      // 여기서는 step 업데이트를 하지 않습니다. 필요하다면 다른 로직 추가
    }
  }, [step, third, moveUp]);


    GoogleSignin.configure({
      webClientId: WEBCLIENTID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      iosClientId: IOSCLIENTID,
    });

    return (
      <View>
        {step == 1 && (<View style={styles.container}>
          <Animated.View style={{ opacity: first }}>
          <Image source={require('../../assets/images/onboarding/mooco.gif')} style={{ width: 300, height: 290 }} />
            </Animated.View>
        </View>)}
        {step == 2 && (<View style={styles.container}>
          <Animated.View style={{ opacity: second }}>
          <MoocoSvg />
          </Animated.View>
        </View>)}
        {step == 3 && (
           <View style={{...styles.container}}>
            <Animated.View style={{...styles.center, 
        opacity: third,
        transform: [{ translateY: moveUp }]
      }}>
           <View style={styles.center}>
           <BarcordSvg />
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
       </Animated.View>
         </View>
        )}
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
      marginTop: 20,
      width: '60%',
      fontSize: 20,
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center',
    },
    firstbutton: {
      top: 40,
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
      top: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thirdbutton: {
      top: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });