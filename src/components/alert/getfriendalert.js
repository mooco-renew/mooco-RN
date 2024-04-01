import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// test용 스크린
export default function GetFriendAlert({ setView}) {

    const handleDelete = () => {
        setView(false);
    }

    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.firsttext}>친구 추가 완료</Text> 
        <Text style={styles.secondtext}>앞으로 밍밍밍밍님의 게시글을 확인할 수 있습니다. 또한, 밍밍밍밍님도 현서님의 게시글을 확인할 수 있습니다.</Text> 
        <View style={styles.buttonbox}>
        <TouchableOpacity style={styles.secondbutton} onPress={() => handleDelete()}>
            <Text style={styles.secondbuttontext}>확인</Text>
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