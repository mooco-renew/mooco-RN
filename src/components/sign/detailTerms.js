import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import termsOfUsing from '../../data/agreement/termsOfUsing';
import termsOfInfo from '../../data/agreement/termsOfInfo';
import { ScrollView } from 'native-base';

// test용 스크린
export default function DetailTerms({index, setCheck, isShowFunc}) {

    const onClick = () => {
        setCheck(true);
        isShowFunc(4);
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
        <Text style={styles.firstlabel}>{index == 0 ? "이용 약관" : "개인정보 취급 방침"}</Text>
        <Text style={styles.text}>{index == 0 ? (
            termsOfUsing
        ) : (
            termsOfInfo
        )}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onClick()}>
           <Text style={styles.buttontext}>완료</Text>
       </TouchableOpacity>
       </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '96%',
      height: '100%',
      backgroundColor: '#000000',
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