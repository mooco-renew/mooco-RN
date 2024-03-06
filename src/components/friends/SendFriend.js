import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// test용 스크린
export default function SendFriend({setFirstView}) {

    const handleDelete = () => {
        setFirstView(true);
      }

    return (
      <View style={styles.container}>
        <View style={styles.firstbox}>
        <View style={styles.image}>

        </View>
        <View style={styles.textbox}>
            <Text style={styles.text}>
                밍밍밍밍
            </Text>
            <Text style={styles.text}>
                @7dwkmqandkw
            </Text>
            </View>
        </View>
        <View style={styles.secondbox}>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
            <Text style={styles.buttontext}>요청 취소</Text>
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
    button: {
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