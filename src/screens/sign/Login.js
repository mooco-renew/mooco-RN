import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

// test용 스크린
export default function Login() {
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>로그인 화면</Text>
    <TouchableOpacity
    onPress={() => navigation.navigate("KakaoLogin")}>
        <Text>카카오 화면으로</Text>
    </TouchableOpacity>
      </View>
    );
  }
  