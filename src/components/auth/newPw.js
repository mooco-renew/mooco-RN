import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { validatePassword } from '../../util/sign/validate';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

// test용 스크린
export default function NewPw() {
  const navigation = useNavigation();
    const [pw, setPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [checked, setChecked] = useState(false); // 동일 비밀번호 체크용
    const [isAvail, setIsAvail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

        // 유효성 검사
        useEffect(() => {
          if(pw != "" && newPw != "" && validatePassword(pw) && validatePassword(newPw) && pw == newPw) {
            setChecked(true);
              setIsAvail(true)
              setErrorMessage('');
          } else {
            if(pw != "") {
              if(!validatePassword(pw)) setErrorMessage('알파벳, 숫자, 특수문자를 포함하여 8자리 이상 작성해주세요.');
            } 
            setIsAvail(false);
            setChecked(false);
          }
        }, [pw, newPw]);

    return (
      <View style={styles.container}>
    <View style={styles.inputbox}>
        <Text style={styles.firstlabel}>새 비밀번호</Text>
        <TextInput 
        value={pw}
        style={styles.input}
        onChangeText={setPw}
        secureTextEntry={true}
        />
        <View style={styles.checkcontainer}>
        <Text style={styles.secondlabel}>비밀번호 확인</Text>
        <Checkbox
          style={styles.checkbox}
          value={checked}
          color={checked ? '#000000' : 'rgba(255,255,255,0.3)'}
        />
        </View>
        <TextInput 
        value={newPw}
        style={styles.input}
        onChangeText={setNewPw}
        secureTextEntry={true}/>
    </View>
    <Text style={styles.errortext}>{errorMessage}</Text>
    <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} disabled={!isAvail} onPress={() => navigation.navigate('OnBoarding')}>
        <Text style={styles.buttontext}>변경 완료</Text>
    </TouchableOpacity>
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
    checkcontainer: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginTop: 17,
      marginLeft: 10,
    },
  });