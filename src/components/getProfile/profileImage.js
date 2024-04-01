import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Pressable, StyleSheet, Image, Text } from 'react-native';

export default function ProfileImage({ image, setImage }) {
    // 이미지 권한 요청을 위한 hooks
    const [status, requestPermisson] = ImagePicker.useMediaLibraryPermissions();
    const [imageUrl, setImageUrl] = useState(null); // 기본 이미지
    const [showOptions, setShowOptions] = useState(false);

    const uploadOrigin = async () => {
      setImage(null);
      setShowOptions(false);
    }

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
            quality: 0.2,
            aspect: [1, 1],
        });
        if(result.canceled) {
            return null; // 이미지 업로드를 취소한 경우
        }

        setImage([result?.assets?.[0]?.fileName, result?.assets?.[0]?.type, result?.assets?.[0]?.uri]); // 내부 요소를 배열로 전달한다.
        
        // 이미지 업로드 결과 및 이미지 경로 업데이트
        setImageUrl(result.assets[0].uri);
        setShowOptions(false);
    }

    const takePhoto = async () => {
        // 권한 확인 코드
        if (!status?.granted) {
            const permission = await requestPermisson();
            if (!permission.granted) {
                return;
            }
        }

        // 카메라 촬영 기능
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.2,
            aspect: [1, 1],
        });
        if(result.canceled) {
          return null; // 이미지 업로드를 취소한 경우
      }
      setImage([result?.assets?.[0]?.fileName, result?.assets?.[0]?.type, result?.assets?.[0]?.uri]); // 내부 요소를 배열로 전달한다.
      
      // 이미지 업로드 결과 및 이미지 경로 업데이트
      setImageUrl(result.assets[0].uri);
      setShowOptions(false);
    };

    return (
        <View style={styles.container}>
        <Pressable onPress={() => setShowOptions(true)}>
        <Image style={styles.image} source={image != null ? { uri: imageUrl } : require('../../assets/images/getProfile/default-image.png')} />
        </Pressable>
        {!showOptions ? (
            <View></View>
        ) : (
            <View style={styles.optionContainer}>
        <Pressable
        style={({ pressed }) => [
          styles.option,
          pressed ? styles.pressedOption : {},
        ]}
        onPress={uploadOrigin}
      >
        {({ pressed }) => (
          <Text style={[styles.optionText, pressed ? styles.pressedText : {}]}>
            기본 이미지
          </Text>
        )}
      </Pressable>
       <Pressable
        style={({ pressed }) => [
          styles.option,
          pressed ? styles.pressedOption : {},
        ]}
        onPress={uploadImage}
      >
        {({ pressed }) => (
          <Text style={[styles.optionText, pressed ? styles.pressedText : {}]}>
            앨범에서 고르기
          </Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.option,
          pressed ? styles.pressedOption : {},
        ]}
        onPress={takePhoto}
      >
        {({ pressed }) => (
          <Text style={[styles.optionText, pressed ? styles.pressedText : {}]}>
            카메라로 열기
          </Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.option,
          pressed ? styles.pressedOption : {},
        ]}
        onPress={() => {
            setShowOptions(false);
        }}
      >
        {({ pressed }) => (
          <Text style={[styles.optionText, pressed ? styles.pressedText : {}]}>
            취소
          </Text>
        )}
      </Pressable>
        </View>
        )}
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        zIndex: 100,
      },
    image: {
        width: 236,
        height: 236,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 120,
        marginTop: 100,
      },
      optionContainer: {
        position:'absolute',
        top: 200,
        width: 254,
        backgroundColor: '#1a1a1a',
        paddingVertical: 10,
        borderRadius: 10,
      },
      option: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
      },
      optionText: {
        color: '#ffffff',
        fontSize: 14,
      },
      pressedOption: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
      },
      pressedText: {
        color: '#000000',
        fontSize: 14,
      }
  });