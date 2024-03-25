import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HelpBox() {
    const navigation = useNavigation();

  return (
    <View style={styles.helptextbox}>
        <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
    <Text style={styles.helptext}>
      아이디 찾기
    </Text>
    </TouchableOpacity>
    <Text style={styles.helptextline}>|</Text>
    <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
    <Text style={styles.helptext}>
      비밀번호 찾기
    </Text>
    </TouchableOpacity>
    <Text style={styles.helptextline}>|</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Account')}>
    <Text style={styles.helptext}>
      회원가입
    </Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    helptextbox: {
        alignItems: 'center',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
      },
      helptext: {
        fontSize: 12,
        color: '#ffffff',
        marginTop: 15,
      },
      helptextline: {
        marginHorizontal: 7,
        fontSize: 12,
        color: '#ffffff',
        marginTop: 15,
      },
});