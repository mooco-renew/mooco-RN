import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, TextInput, Image } from 'react-native';

// test용 스크린
export default function GetProfile() {
    const navigation = useNavigation();
    const [nickname, setNickname] = useState("");

    // 이미지 권한 요청을 위한 hooks
    const [status, requestPermisson] = ImagePicker.useMediaLibraryPermissions();
    const [imageUrl, setImageUrl] = useState('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'); // 이미지 주소(1x1 픽셀 크기의 완전 투명한 gif 이미지를 나타낸다.)

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
    }

    return (
      <View style={styles.container}>
    <View style={styles.inputbox}>
        <Text style={styles.firstlabel}>프로필 설정</Text>
        <Pressable onPress={uploadImage}>
            <Image style={styles.imagebox} source={{ uri: imageUrl }}/>
        </Pressable>
        <Text style={styles.secondlabel}>Nickname</Text>
        <TextInput 
        value={nickname}
        style={styles.input}
        onChangeText={setNickname}
        placeholder='닉네임을 입력해주세요'
        placeholderTextColor='#979797' />
    </View>
    <TouchableOpacity style={styles.button}>
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
      backgroundColor: '#ffffff',
    },
    inputbox: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
    },
    firstlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#979797',
      fontSize: 12,
      marginTop: 10,
    },
    imagebox: {
        width: 120,
        height: 120,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#ffc7c7',
        borderRadius: 120,
      },
    secondlabel: {
      width: '90%',
      textAlign: 'left',
      color: '#979797',
      fontSize: 12,
      marginTop: 20,
    },
    input: {
      width: '90%',
      borderBottomWidth: 1,
      padding: 2,
      borderColor: '#d4d4d4',
    },
    button: {
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      paddingVertical: 18, // 상하 패딩 
      borderRadius: 10,
      marginTop: 25,
    },
    buttontext: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });