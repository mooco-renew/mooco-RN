import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions  } from 'react-native';
import BarcordSvg from '../../assets/images/onboarding/barcord';
import GoogleSvg from '../../assets/images/sign/google';
import KakaoSvg from '../../assets/images/sign/kakao';
import getToken from '../../server/getToken';

// gif code
// <Image source={require('../../assets/images/test.gif')} style={{ width: 200, height: 200 }} />

export default function OnBoarding() {
    const navigation = useNavigation();
    const data = getToken();

    return (
      <View style={styles.container}>
        <View style={styles.center}>
        <BarcordSvg />
        <Text style={styles.firsttext}>
            나만의 무드 바코드
        </Text>
        </View>
    <TouchableOpacity style={styles.firstbutton} onPress={() => navigation.navigate('KakaoLogin')}>
        <KakaoSvg />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoogleLogin')}>
        <GoogleSvg />
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
      backgroundColor: '#151515',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    },
    firsttext: {
      width: '60%',
      fontSize: 20,
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center',
      marginTop: 5,
    },
    firstbutton: {
      top: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      top: 115,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });