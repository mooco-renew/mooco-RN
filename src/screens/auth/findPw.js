import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { validateEmail } from '../../util/sign/validate';
import NewPw from '../../components/auth/newPw';
import { allFalse, allTrue, firstTrue, firstTrueOnly, secondTrueOnly } from '../../util/auth/authStep';
import EmailAuth from '../../components/auth/emailAuth';

// test용 스크린
export default function FindPw() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [isAvail, setIsAvail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAuth, setShowAuth] = useState([false, false]);

            // 유효성 검사
            useEffect(() => {
              if(email != "" && validateEmail(email)) {
                setIsAvail(true)
                setErrorMessage('');
              } else {
                if(email != "") {
                  if(!validateEmail(email)) setErrorMessage('올바른 이메일 형식으로 작성해주세요.');
                }
                setIsAvail(false);
              }
            }, [email]);

                   // 배열 true로 변환
                   const setNewArray = index => {
                    setShowAuth((prevShowAuth) => {
                      const newShowAuth = [...prevShowAuth]; // 배열 복사
                      newShowAuth[index] = true; // 특정 인덱스의 값을 true로 설정
                      return newShowAuth; // 업데이트된 배열 반환
                    });
                  }

    return (
      <View style={styles.container}>
      {allFalse(showAuth) && (
            <View style={styles.container}>
            <Text style={styles.title}>비밀번호 찾기</Text>
            <Text style={styles.firstlabel}>이메일을 입력해주세요.</Text>
            <View style={styles.inputcontainer} >
            <TextInput 
            value={email}
            style={styles.input}
            onChangeText={setEmail}/>
            </View>
        <Text style={styles.errortext}>{errorMessage}</Text>
        <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} disabled={!isAvail} onPress={() => setNewArray(0)}>
            <Text style={styles.buttontext}>다음</Text>
        </TouchableOpacity>
          </View>
      )}
      {firstTrueOnly(showAuth) && (<EmailAuth email={email} setNewArray={setNewArray}/>)}
      {allTrue(showAuth) && (<NewPw />)}
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
    },
    title: {
      width: '90%',
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '800',
      fontSize: 20,
      marginTop: -90,
    },
    firstlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontWeight: '500',
      fontSize: 14,
      marginTop: 40,
    },
    inputcontainer: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    input: {
      width: '100%',
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
      marginTop: 20,
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
      marginTop: 10,
      marginBottom: 10,
    },
  });