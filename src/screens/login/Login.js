import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import GoogleSvg from '../../assets/images/sign/google';
import KakaoSvg from '../../assets/images/sign/kakao';

// test용 스크린
export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    return (
      <View style={styles.container}>
    <View style={styles.inputbox}>
        <Text style={styles.firstlabel}>Email</Text>
        <TextInput 
        value={email}
        style={styles.input}
        onChangeText={setEmail}/>
        <Text style={styles.secondlabel}>Password</Text>
        <TextInput 
        value={pw}
        style={styles.input}
        onChangeText={setPw}
        secureTextEntry={true}/>
    </View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>확인</Text>
    </TouchableOpacity>
    <View style={styles.hrbox}>
      <View style={styles.hrstyle}>
      </View>
      <Text style={styles.hrboxtext}>
        Or Login width
      </Text>
      <View style={styles.socialcontainer}>
      <TouchableOpacity style={styles.socialbox} onPress={() => navigation.navigate('GoogleLogin')}>
          <GoogleSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialbox} onPress={() => navigation.navigate('KakaoLogin')}>
          <KakaoSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.helptextbox}>
      <Text style={styles.helptext}>
        아이디 찾기
      </Text>
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
      backgroundColor: '#ffffff',
    },
    inputbox: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
    },
    firstlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#979797',
      fontSize: 12,
      marginTop: 10,
    },
    secondlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#979797',
      fontSize: 12,
      marginTop: 20,
    },
    input: {
      width: '90%',
      borderBottomWidth: 1,
      padding: 2,
      borderColor: '#d4d4d4',
    },
    button: {
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 25,
    },
    buttontext: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    hrbox: {
      marginTop: 10,
      width: '90%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    hrstyle: {
      borderBottomWidth: 1,
      marginTop: 10,
      borderColor: '#D8DADC',
      width: '100%',
    },
    hrboxtext: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.7)',
      backgroundColor: '#ffffff',
      marginTop: -10,
      paddingHorizontal: 20,
    },
    helptextbox: {
      alignItems: 'center',
      marginTop: 15,
    },
    helptext: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.7)',
      marginTop: 15,
    },
    socialcontainer: {
      flexDirection: 'row',
      width: '60%',
      alignItems: 'center',
      marginTop: 30,
      gap: 50,
    },
    socialbox: {
      paddingHorizontal: 30,
      paddingVertical: 18,
      borderWidth: 1,
      borderColor: '#D8DADC',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });