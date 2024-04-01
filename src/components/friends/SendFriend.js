import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import cancleRequest from '../../server/friends/cancle-request';
import sendRequest from '../../server/friends/send-request';
import React, { useState, useEffect } from 'react';

// test용 스크린
export default function SendFriend({userId, nickname, identifierId, profileImageUrl}) {
  const [step, setStep] = useState(1);

  const handleClick = async () => {
    if(step == 1) {
      let data = await cancleRequest(userId); // 요청 취소
      if(data.success == true) {
        setStep(2);
      } else if(data.success == false) {
        alert(data.error.message);
      } else {
        alert("서버 에러");
      }
    } else if(step == 2) {
      let data = await sendRequest(userId); // 친구 요청하기
      if(data.success == true) {
        setStep(1);
      } else if(data.success == false) {
        alert(data.error.message);
      } else {
        alert("서버 에러");
      }
    } else {
    }
  }

    return (
      <View style={styles.container}>
        <View style={styles.firstbox}>
        <View>
        <Image style={styles.image} source={{uri: profileImageUrl}} />
        </View>
        <View style={styles.textbox}>
            <Text style={styles.text}>
                {nickname}
            </Text>
            <Text style={styles.text}>
                {identifierId}
            </Text>
            </View>
        </View>
        <View style={styles.secondbox}>
        <TouchableOpacity
    style={[styles.button,{ backgroundColor: step == 1 ? '#626262' : '#151515' }, ]}onPress={() => handleClick()}>
    <Text style={styles.buttontext}>
        {step == 1 ? "요청 취소" : "추가"}
    </Text>
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
      marginBottom: 15,
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
    },
    text: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
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