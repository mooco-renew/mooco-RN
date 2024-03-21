import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { setNewTrueArray } from '../../util/array/newTrueArray';
import { setNewFalseArray } from '../../util/array/newFalseArray';
import { allFalse, firstFalseOnly, firstTrueOnly, lastFalseOnly } from '../../util/auth/authStep';
import DetailTerms from '../../components/sign/detailTerms';

export default function Agreement() {
  const navigation = useNavigation();

  const [allchecked, setAllchecked] = useState(false);
    const [firstchecked, setFirstChecked] = useState(false); // 이용약관 동의서
    const [secondchecked, setSecondChecked] = useState(false); // 개인정보 보호 동의서
    const [isAvail, setIsAvail] = useState(false); // 전체 동의 하였는지 판단
    const [isShow, setShow] = useState([false, false]);

    // 모든 선택지를 true로 한다면, allchecked도 true로 변경한다. ++ 유효성 검사
    useEffect(() => {
      if(firstchecked == true && secondchecked == true) {
        setAllchecked(true);
        setIsAvail(true);
      } 
    }, [firstchecked, secondchecked]);

    const isShowFunc = (index) => {
      if(index == 0) { 
        let newArray = [true, false];
        setShow(newArray);
       }
      else if(index == 1) { 
        let newArray = [false, true];
        setShow(newArray);
      }
      else if(index == 4) {
        let newArray = [false, false];
        setShow(newArray);
      }
    }

  return (
    <View style={styles.container}>
      {allFalse(isShow) && (
         <View style={styles.container}>
           <View style={styles.firstcheckcontainer}>
       <Checkbox
             style={styles.checkbox}
             value={allchecked}
             onChange={setAllchecked}
             color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
           />
       <Text style={styles.checktext}>전체 항목에 동의합니다.</Text>
       </View>
       <View style={styles.checkcontainer}>
          <View>
          <TouchableOpacity style={styles.checkbutton} onPress={() => isShowFunc(0)}>
       <Checkbox
             style={styles.checkbox}
             value={firstchecked}
             color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
           />
       <Text style={styles.checktext}>이용약관 동의서</Text>
       </TouchableOpacity>
       </View>
       </View>
       <View style={styles.checkcontainer}>
       <TouchableOpacity style={styles.checkbutton} onPress={() => isShowFunc(1)}>
       <Checkbox
             style={styles.checkbox}
             value={secondchecked}
             color={allchecked ? '#000000' : 'rgba(255,255,255,0.3)'}
           />
       <Text style={styles.checktext}>개인정보 이용 동의서</Text>
       </TouchableOpacity>
       </View>
       <TouchableOpacity style={[styles.button, !isAvail && styles.buttondisable]} onPress={() => navigation.navigate('Account', { _checked: true })} disabled={!isAvail}>
           <Text style={styles.buttontext}>완료</Text>
       </TouchableOpacity>
       </View>
      )}
       {firstTrueOnly(isShow) && <DetailTerms index={0} setCheck={setFirstChecked} isShowFunc={isShowFunc}/>}
       {firstFalseOnly(isShow) && <DetailTerms index={1} setCheck={setSecondChecked} isShowFunc={isShowFunc}/>}
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
    checkbutton: {
      display: 'flex',
      flexDirection: 'row',
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