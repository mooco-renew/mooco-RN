import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import StarsSvg from '../../assets/images/onboarding/stars';

export default function OnBoarding() {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <StarsSvg />
        <Text style={styles.firsttext}>
            환영합니다
        </Text>
        <Text style={styles.secondtext}>
            지금 바로 당신의 {' '}<Text style={styles.colortext}>무드 바코드</Text> {' '}아트를 생성해보세요!
        </Text>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>로그인 하기</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.subbutton} onPress={() => {/* 가입 로직 */}}>
        <Text style={styles.subbuttontext}>가입하기</Text>
    </TouchableOpacity>
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
    firsttext: {
      fontSize: 28,
      marginTop: 10,
      fontWeight: '800',
    },
    secondtext: {
        width: '55%',
        fontSize: 14,
        marginTop: 5,
        color: 'rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
    },
    colortext: {
        color: '#71CAC5',
    },
    button: {
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 60,
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