import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import findId from '../../server/auth/findId';

// test용 스크린
export default function GetId({email, code}) {
    const navigation = useNavigation();
    const [id, setId] = useState("");

    useEffect(async () => {
      const fetchData = async () => {
        let data = await findId(email, code);
        console.log(data);
        if (data.success === false) {
          alert(data.error.message);
          navigation.navigate("Login");
        } else if (data.success === true) {
          setId(data.data.id);
        }
      };
    
      fetchData();
    }, [])

    return (
      <View style={styles.container}>
        <Text style={styles.firstlabel}>{email} 계정의 id는 {id}입니다.</Text>
        <View style={styles.helptextbox}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={styles.helptext}>
      로그인
    </Text>
    </TouchableOpacity>
    <Text style={styles.helptextline}>|</Text>
    <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
    <Text style={styles.helptext}>
      비밀번호 찾기
    </Text>
    </TouchableOpacity>
    </View>
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
    firstlabel: {
      width: '90%',
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '800',
      fontSize: 18,
      marginTop: -90,
    },
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