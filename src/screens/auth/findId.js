import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { validateEmail } from '../../util/sign/validate';
import EmailAuth from '../../components/auth/emailAuth';
import GetId from '../../components/auth/getId';
import { allFalse, allTrue, firstTrue, firstTrueOnly, secondTrueOnly } from '../../util/auth/authStep';
import { setNewTrueArray } from '../../util/array/newTrueArray';
import requestEmail from '../../server/auth/emailAuth';

// test용 스크린
export default function FindId() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(0);
    const [isAvail, setIsAvail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1);

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

            const sendEmail = async () => {
              let data = await requestEmail(email);
              if(data == true) {
                setStep(2); // 이메일 인증 코드 입력 페이지로 이동
              }
            }

    return (
      <View style={styles.container}>
        {step == 1 && (
              <View style={styles.container}>
              <Text style={styles.title}>아이디 찾기</Text>
              <Text style={styles.firstlabel}>이메일을 입력해주세요.</Text>
              <View style={styles.inputcontainer} >
              <TextInput 
              value={email}
              style={styles.input}
              onChangeText={setEmail}
              placeholder='이메일을 입력해주세요.'
              placeholderTextColor='rgba(0, 0, 0, 0.3)'
              />
              </View>
          <Text style={styles.errortext}>{errorMessage}</Text>
          <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} disabled={!isAvail} onPress={() => sendEmail()}>
              <Text style={styles.buttontext}>다음</Text>
          </TouchableOpacity>
            </View>
        )}
        {step == 2 && (<EmailAuth by="findid" email={email} id="" pw="pw" setStep={setStep} setCode={setCode}/>)}
        {step == 3 && (<GetId email={email} code={code}/>)}
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