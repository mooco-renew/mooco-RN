import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import ProfileImage from '../../components/getProfile/profileImage';
import postUserInfo from '../../server/getInfo/post-profile';

// test용 스크린
export default function GetProfile() {
  const navigation = useNavigation();
    const [nickname, setNickname] = useState("");
    const [image, setImage] = useState([]);

    // 유저 정보 전송
	const clickPost = async () => {
    postUserInfo(image, nickname, navigation);
	  };

    return (
      <View style={styles.container}>
        <ProfileImage setImage={setImage} />
        <View style={styles.inputbox}>
        <TextInput 
        value={nickname}
        style={styles.input}
        onChangeText={setNickname}
        placeholder='닉네임을 입력해주세요'
        placeholderTextColor='#ffffff' />
    </View>
    <TouchableOpacity style={styles.button} onPress={clickPost}>
        <Text style={styles.buttontext}>확인</Text>
    </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    inputbox: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 40,
    },
    image: {
        width: 236,
        height: 236,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 120,
        marginTop: 100,
      },
    input: {
      width: 236,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 100,
      borderColor: '#ffffff',
      borderWidth: 1,
      fontSize: 16,
      textAlign: 'center',
      color: '#ffffff',
    },
    button: {
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 110,
    },
    buttontext: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '800',
    },
  });