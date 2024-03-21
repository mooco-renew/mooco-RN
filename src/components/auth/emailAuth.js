import React, { useState, createRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { setNewTrueArray } from '../../util/array/newTrueArray';
import checkCode from '../../server/auth/checkCode';
import requestEmail from '../../server/auth/emailAuth';

export default function EmailAuth({ email , setShowAuth, setCode }) {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const [isAvail, setIsAvail] = useState(false);
  let inputRefs = Array(6).fill().map(() => createRef());

  const handleChangeText = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
    // OTP input 알고리즘 
    if (text && index < 5) {
      inputRefs[index + 1].current.focus();
    }
    if (!text && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  // 유효성 검사
  useEffect(() => {
    // every 메서드를 사용하여 모든 입력값이 빈 문자열이 아닌지 확인
  const allFilled = inputs.every(input => input.trim() !== "");
  if (allFilled) {
    setIsAvail(true);
  } else {
    setIsAvail(false); 
  }
  }, [inputs]);

  const sendCode = async () => {
    const combinedString = inputs.join("");   // inputs 배열의 모든 요소를 하나의 문자열로 합친다.
    const resultInt = parseInt(combinedString, 10);  // 문자열을 정수형으로 변환한다.
    let data = await checkCode(email, resultInt); // 코드 인증 api
    if(data == true) { // 성공이라면
      setCode(resultInt); // code 업데이트
      setNewTrueArray(setShowAuth, 1) // 화면 전환
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.center}>
      <Text style={styles.firsttext}>코드를 보내드렸습니다.</Text>
      <Text style={styles.secondtext}>{email} 이메일 인증을 위해 아래에 코드를 입력해주세요.</Text>
      </View>
    <View style={styles.padcontainer}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(text) => handleChangeText(text, index)}
          ref={inputRefs[index]}
          value={input}
        />
      ))}
    </View>
    <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} disabled={!isAvail} onPress={() => sendCode()} >
        <Text style={styles.buttontext}>확인</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => requestEmail(email)}>
    <Text style={styles.retext}>이메일 인증이 안 왔다면 여기를 클릭해주세요. </Text>
    </TouchableOpacity>
    </View>
  )
}

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
    width: '100%',
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  secondtext: {
    maxWidth: '80%',
    width: '80%',
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 10,
  },
  padcontainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    textAlign: 'center',
    borderBottomColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 4,
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', 
    paddingVertical: 18, // 상하 패딩 
    borderRadius: 10,
    marginTop: 60,
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
  retext: {
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
});
