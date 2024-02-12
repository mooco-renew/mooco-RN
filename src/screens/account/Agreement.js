import React from 'react'
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function Agreement() {
    const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>약관동의</Text>
        <View style={styles.firstcheckcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#000000' : undefined}
        />
    <Text style={styles.checktext}>전체동의</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#000000' : undefined}
        />
    <Text style={styles.checktext}>약관1)</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#000000' : undefined}
        />
    <Text style={styles.checktext}>약관2)</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#000000' : undefined}
        />
    <Text style={styles.checktext}>약관3)</Text>
    </View>
    <View style={styles.checkcontainer}>
    <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#000000' : undefined}
        />
    <Text style={styles.checktext}>약관4)</Text>
    </View>
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>다음으로</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    title: {
        width: '90%',
        fontSize: 20,
        fontWeight: '800',
        marginTop: 10,
        textAlign: 'left',
    },
    button: {
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 40,
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
        marginTop: 35,
        borderBottomWidth: 1,
        borderColor: '#dedede',
        paddingBottom: 25,
      },
    checkcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginTop: 20,
    },
    checktext: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: '800',
    },
    checkbox: {
      width: 24,
      height: 24,
      marginRight: 10,
      borderRadius: 0,
      borderColor: '#000000',
      borderWidth: 1,
    },
  });