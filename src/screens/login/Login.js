import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

// test용 스크린
export default function Login() {
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>회원가입</Text>
    <View>
        <Text>이메일</Text>
        <TextInput />
        <Text>비밀번호</Text>
        <TextInput />
    </View>
    <TouchableOpacity>
        <Text>확인</Text>
    </TouchableOpacity>
    <Text>가입과 동시에 이용 약관 및 개인정보 처리방침에 동의합니다.</Text>
    <Text>소셜 회원가입</Text>
    <TouchableOpacity
    onPress={() => navigation.navigate("KakaoLogin")}>
        <Text>카카오 로그인</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={() => navigation.navigate("GoogleLogin")}>
        <Text>구글 로그인</Text>
    </TouchableOpacity> 
      </View>
    );
  }
  