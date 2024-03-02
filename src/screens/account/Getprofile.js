import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, TextInput, Image } from 'react-native';
import preImageSvg from '../../assets/images/getProfile/preImage';

// test용 스크린
export default function GetProfile() {
    const navigation = useNavigation();
    const [nickname, setNickname] = useState("");

    // 이미지 권한 요청을 위한 hooks
    const [status, requestPermisson] = ImagePicker.useMediaLibraryPermissions();
    const [imageUrl, setImageUrl] = useState(require('../../assets/images/getProfile/pre-image.png')); // 기본 이미지
    const [isUploaded, setIsUploaded] = useState(false);

    const uploadImage = async () => {
        // 권한 확인 코드 : 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (!status?.granted) {
            const permission = await requestPermisson();
            if(!permission.granted) {
                return null;
            }
        }
        // 이미지 업로드 기능
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1],
        });
        if(result.canceled) {
            return null; // 이미지 업로드를 취소한 경우
        }
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        setImageUrl(result.assets[0].uri);
        setIsUploaded(true);
    }

    return (
      <View style={styles.container}>
        <Pressable onPress={uploadImage}>
        <Image style={styles.image} source={isUploaded ? { uri: imageUrl } : imageUrl} />
        </Pressable>
        <View style={styles.inputbox}>
        <TextInput 
        value={nickname}
        style={styles.input}
        onChangeText={setNickname}
        placeholder='닉네임을 입력해주세요'
        placeholderTextColor='#ffffff' />
    </View>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FriendsList')}>
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