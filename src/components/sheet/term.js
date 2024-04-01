import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import termsOfUsing from '../../data/agreement/termsOfUsing';
import termsOfInfo from '../../data/agreement/termsOfInfo';
import { ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// test용 스크린
export default function Term({ id, setTerm, setCheck }) {
  const navigation = useNavigation();

  const handleAgree = (id) => {
    setCheck((prev) => {
        const newCheck = [...prev]; // 현재 상태를 복사하여 새 배열을 생성
        if (id === 1) {
            newCheck[0] = true; // 첫 번째 약관에 동의
        } else if (id === 2) {
            newCheck[1] = true; // 두 번째 약관에 동의
        }
        return newCheck; // 변경된 배열 상태를 반환
    });
    setTerm(0); // 화면 초기화
};

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
        <Text style={styles.firstlabel}>{id == 1 ? "이용 약관" : "개인정보 취급 방침"}</Text>
        <Text style={styles.text}>{id == 1 ? (
            termsOfUsing
        ) : (
            termsOfInfo
        )}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgree(id)}>
           <Text style={styles.buttontext}>동의하기</Text>
       </TouchableOpacity>
       </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      zIndex: 100,
    },
    firstlabel: {
      width: '100%',
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: 16,
      marginTop: 20,
    },
      text: {
        fontSize: 12,
        color: '#ffffff',
        marginTop: 15,
      },
      button: {
        backgroundColor: '#151515',
        alignItems: 'center',
        width: '100%', 
        paddingVertical: 20, // 상하 패딩 
        borderRadius: 10,
        marginTop: 60,
        marginBottom: 60,
      },
      buttontext: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
      },
  });