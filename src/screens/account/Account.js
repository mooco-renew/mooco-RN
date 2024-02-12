import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

// test용 스크린
export default function Account() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [checked, setChecked] = useState(false);

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
  <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#000000' : undefined}
        />
    <Text style={styles.checktext}>가입과 동시에 이용 약관 및 개인정보 처리방침에 동의합니다.</Text>
    </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
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
    checkcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginTop: 30,
    },
    checktext: {
      fontSize: 14,
      textAlign: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      marginRight: 5,
      borderRadius: 10,
    },
  });