import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import deleteFriend from '../../server/friends/delete-friend';

// test용 스크린
export default function DeleteFriendAlert({ setView, selectedId, setData}) {
    const handleCancel = () => {
        setView(false);
    }

    const handleDelete = async () => {
        let data = await deleteFriend(selectedId);
        if(data.success == true) { // 삭제 성공 시
            const result = await getFriendsList(); // 친구 목록 새로고침
            if(result.success == true) {
            setData(result.data.friendList); 
            } else if(result.success == false) {
              alert(result.error.message);
            }
            setView(false);
        } else if(data.success == false) {
            alert(data.error.message);
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.firsttext}>친구 삭제</Text> 
        <Text style={styles.secondtext}>'밍밍밍밍'님의 게시글을 더 이상 볼 수 없으며, 나의 게시글도 상대방이 열람할 수 없습니다.</Text> 
        <View style={styles.buttonbox}>
        <TouchableOpacity style={styles.firstbutton} onPress={() => handleCancel()}>
            <Text style={styles.firstbuttontext}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondbutton} onPress={() => handleDelete()}>
            <Text style={styles.secondbuttontext}>친구 삭제</Text>
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
        width: '76%',
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