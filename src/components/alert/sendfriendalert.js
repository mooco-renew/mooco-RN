import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// test용 스크린
export default function SendFriendAlert({ setView }) {
    const handleCancel = () => {
        // 취소 로직
        setView(false);
    }

    const handleDelete = () => {
        // 삭제 로직 추가
        setView(false);
    }

    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.firsttext}>친구 요청 취소</Text> 
        <Text style={styles.secondtext}>'밍구밍구밍'님께 보낸 친구 요청을 취소할까요?</Text> 
        <View style={styles.buttonbox}>
        <TouchableOpacity style={styles.firstbutton} onPress={() => handleCancel()}>
            <Text style={styles.firstbuttontext}>닫기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondbutton} onPress={() => handleDelete()}>
            <Text style={styles.secondbuttontext}>요청 취소</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        zIndex: 100,
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    box: {
        width: '75%',
        height: 207,
        backgroundColor: '#000000',
        borderRadius: 10,
        padding: 20,
    },
    firsttext: {
        width: '100%',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
      },
      secondtext: {
        width: '100%',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '400',
        color: '#ffffff',
        marginTop: 20,
      },
    buttonbox: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        right: 20,
    },
    firstbutton: {
        backgroundColor: '#8C8C8C',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
        marginRight: 10,
    },
    firstbuttontext: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    secondbutton: {
        backgroundColor: '#B466C3',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    secondbuttontext: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
  });