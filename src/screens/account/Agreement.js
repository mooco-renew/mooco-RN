import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function Agreement({ route }) {
  const navigation = useNavigation();

  const [allchecked, setAllchecked] = useState(false);
    const [firstchecked, setFirstChecked] = useState(false);
    const [secondchecked, setSecondChecked] = useState(false);
    const [thirdchecked, setThirdChecked] = useState(false);
    const [fourchecked, setFourChecked] = useState(false);
    const [isAvail, setIsAvail] = useState(false);

    // navigation으로 보낸 params 받기
    const { id, pw } = route.params;

    const AllChecked = () => {
      if(firstchecked == true && secondchecked == true && thirdchecked == true && fourchecked == true) {
        setAllchecked(false);
        setFirstChecked(false);
        setSecondChecked(false);
        setThirdChecked(false);
        setFourChecked(false);
      } else {
        setAllchecked(true);
        setFirstChecked(true);
        setSecondChecked(true);
        setThirdChecked(true);
        setFourChecked(true);
      }
    }

    // 모든 선택지를 true로 한다면, allchecked도 true로 변경한다. ++ 유효성 검사
    useEffect(() => {
      if(firstchecked == true && secondchecked == true && thirdchecked == true && fourchecked == true) {
        setAllchecked(true);
        setIsAvail(true);
      } else {
        setAllchecked(false);
        setIsAvail(false);
      }
    }, [firstchecked, secondchecked, thirdchecked, fourchecked, allchecked]);

  return (
    <View style={styles.container}>
        <View style={styles.firstcheckcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={allchecked}
          onValueChange={() => AllChecked()}
          color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
        />
    <Text style={styles.checktext}>전체 항목에 동의합니다.</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={firstchecked}
          onValueChange={setFirstChecked}
          color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
        />
    <Text style={styles.checktext}>약관1)</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={secondchecked}
          onValueChange={setSecondChecked}
          color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
        />
    <Text style={styles.checktext}>약관2)</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={thirdchecked}
          onValueChange={setThirdChecked}
          color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
        />
    <Text style={styles.checktext}>약관3)</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={fourchecked}
          onValueChange={setFourChecked}
          color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
        />
    <Text style={styles.checktext}>약관4)</Text>
    </View>
    <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} onPress={() => navigation.navigate('Account', { _id: id, _pw: pw, _checked: true })} disabled={!isAvail}>
        <Text style={styles.buttontext}>완료</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    button: {
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 40,
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
    firstcheckcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginTop: 50,
        borderBottomWidth: 1,
        borderColor: '#ffffff',
        paddingBottom: 15,
        marginBottom: 30,
      },
    checkcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginBottom: 60,
    },
    checktext: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: '800',
      color: '#ffffff',
    },
    checkbox: {
      width: 20,
      height: 20,
      marginRight: 10,
      borderRadius: 30,
      borderWidth: 2.5,
      borderColor: 'rgba(255,255,255,0.3)',
    },
  });