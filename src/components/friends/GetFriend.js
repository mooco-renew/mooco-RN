import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// test용 스크린
export default function GetFriend({setSecondView}) {

    const clickDelete = () => {
        // 추후 다른 로직 추가 필요할 듯
    }
    const clickGet = () => {
        setSecondView(true);
    }

    return (
      <View style={styles.container}>
        <View style={styles.firstbox}>
        <View style={styles.image}>

        </View>
        <View style={styles.textbox}>
            <Text style={styles.text}>
                밍밍밍밍
            </Text>
            <Text style={styles.text}>
                @7dwkmqandkw
            </Text>
            </View>
        </View>
        <View style={styles.secondbox}>
        <TouchableOpacity style={styles.firstbutton} onPress={() => clickGet()}>
            <Text style={styles.buttontext}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondbutton} onPress={() => clickDelete()}>
            <Text style={styles.buttontext}>거절</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    firstbox: {
        width: '70%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
      },
      secondbox: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
    image: {
      width:50,
      height: 50,
      backgroundColor: '#ffffff',
      borderRadius: 100,
    },
    textbox: {
        marginLeft: 10,
      flexDirection: 'column',
      gap: 2,
    },
    text: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    firstbutton: {
        backgroundColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    secondbutton: {
        backgroundColor: '#626262',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    buttontext: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    }
  });