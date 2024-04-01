import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

// test용 스크린
export default function CustomAlert({value, message}) {
    const [isVisible, setIsVisible] = useState(false);
        setIsVisible(value);
        console.log(value);

    const handleClose = () => {
        setIsVisible(false); // 창 닫기
    }

    if(!isVisible) {
        return null;
    } else {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.secondtext}>{message}</Text> 
        <View style={styles.buttonbox}>
        <TouchableOpacity style={styles.secondbutton} onPress={() => handleClose()}>
            <Text style={styles.secondbuttontext}>닫기</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        zIndex: 100,
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    box: {
        width: '75%',
        height: 207,
        backgroundColor: '#000000',
        borderRadius: 10,
        padding: 20,
    },
    firsttext: {
        width: '100%',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
      },
      secondtext: {
        width: '100%',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '400',
        color: '#ffffff',
        marginTop: 20,
      },
    buttonbox: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        right: 20,
    },
    secondbutton: {
        backgroundColor: '#8C8C8C',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    secondbuttontext: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
  });