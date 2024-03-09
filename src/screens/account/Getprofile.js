import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import ProfileImage from '../../components/getProfile/profileImage';
import getToken from '../../server/getToken';
import { SERVER_HOST } from "@env";
import axios from 'axios';
import { Platform } from 'react-native';


// test용 스크린
export default function GetProfile() {
    const navigation = useNavigation();
    const token = getToken();

    const [nickname, setNickname] = useState("");
    const [image, setImage] = useState([]);

	const postUserInfo = async () => {
    const formData = new FormData();
    // 이미지 용량이 너무 커서 압축이 필요하다.
    // 안드는 jpeg, ios는 jpg로 고정
    const file = {
      name: image[0],
      type: Platform.OS === 'android' ? 'image/jpeg' : 'image/jpg',
      uri: image[2],
    }

    formData.append('profileImage', file);
    formData.append('nickname', nickname);

		const config = {
			headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
			}
		};
		
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/auth/user-info`, formData, config);
      if(response.data.success == true) {
        navigation.navigate('Daily');  // 우선 daliy로 이동
      } else {
        alert('에러가 발생했습니다. 이미지를 다시 보내주세요.');
      }
		} catch (error) {
		  console.log('에러가 있습니다. ', error);
		}
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
    <TouchableOpacity style={styles.button} onPress={postUserInfo}>
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