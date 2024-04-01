import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function DetailTerms({index, setTerm, color}) {
  return (
            <View style={styles.container}>
        <View style={styles.circle}>
        </View>
        <Text style={styles.text}>
            [필수] {index == 1 ? "이용 약관" : "개인정보 취급 방침"}
        </Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext} onPress={() => setTerm(index)}>{color === true ? '완료' : '보기'}</Text>
        </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginVertical: 5,
      width: '100%',
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
    },
    newcontainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#000000',
      },
    circle: {
      width: 4,
      height: 4,
      borderColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 100,
      borderWidth: 3,
      marginRight: 5,
    },
    text: {
      width: '90%',
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
      },
      buttontext: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '600',
      },
  });