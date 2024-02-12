import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import StarsSvg from '../../assets/images/onboarding/stars';

export default function OnBoarding() {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <StarsSvg />
        <Text style={styles.firsttext}>
            지금 바로 나만의 
        </Text>
        <Text style={styles.firsttext}>
            무드 바코드를 만들어 보세요
        </Text>
    <TouchableOpacity style={styles.firstbutton} onPress={() => navigation.navigate('KakaoLogin')}>
        <Text style={styles.buttontext}>카카오</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoogleLogin')}>
        <Text style={styles.buttontext}>구글</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agreement')}>
        <Text style={styles.buttontext}>약관동의(임시라우팅)</Text>
    </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#151515',
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
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%', 
      paddingVertical: 15, // 상하 패딩 
      borderRadius: 10,
      marginTop: 50,
    },
    button: {
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%', 
      paddingVertical: 15, // 상하 패딩 
      borderRadius: 10,
      marginTop: 15,
    },
    buttontext: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    subbutton: {
        backgroundColor: 'transparent',
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.7)',
        marginTop: 20,
    },
    subbuttontext: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.7)',
    },
  });