import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import receiveFriend from '../../server/friends/accept-friend';
import refuseFriend from '../../server/friends/refusefriend';
import getReceviedList from '../../server/friends/recevied-list';

// test용 스크린
export default function GetFriend({setReceivedList, nickname, identifierId, profileImageUrl, userId}) {

    const clickRefuse = async () => {
       let data = await refuseFriend(userId); // 요청 거절
       if(data.success == true) {
        const received_result = await getReceviedList();
        if(received_result.success == true) {
          setReceivedList(received_result.data.receiceRequestList);
        } else if(received_result.success == false){
          alert(received_result.error.message);
        }
       } else if(data.success == false) {
        alert(data.error.message);
       } else {
        alert("서버 에러");
       }
    }
    const clickReceive = async () => {
      let data = await receiveFriend(userId); // 요청 수락
      if(data.success == true) {
        const received_result = await getReceviedList();
        if(received_result.success == true) {
          setReceivedList(received_result.data.receiceRequestList);
        } else if(received_result.success == false){
          alert(received_result.error.message);
        }
      } else if(data.success == false) {
        alert(data.error.message);
      } else {
       alert("서버 에러");
      }
    }

    return (
      <View style={styles.container}>
         <View style={styles.firstbox}>
        <View>
        <Image style={styles.image} source={{uri: profileImageUrl}} />
        </View>
        <View style={styles.textbox}>
            <Text style={styles.text}>
                {nickname}
            </Text>
            <Text style={styles.text}>
                {identifierId}
            </Text>
            </View>
        </View>
        <View style={styles.secondbox}>
        <TouchableOpacity style={styles.firstbutton} onPress={() => clickReceive()}>
            <Text style={styles.buttontext}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondbutton} onPress={() => clickRefuse()}>
            <Text style={styles.buttontext}>거절</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    firstbox: {
        width: '70%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
      },
      secondbox: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
      },
    image: {
      width:50,
      height: 50,
      backgroundColor: '#ffffff',
      borderRadius: 100,
    },
    textbox: {
        marginLeft: 10,
      flexDirection: 'column',
    },
    text: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    firstbutton: {
        backgroundColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    secondbutton: {
        backgroundColor: '#626262',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    buttontext: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    }
  });