import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import DeleteFriend from '../../components/friends/DeleteFriend';
import CustomSwitch from '../../components/switch/CustomSwitch';
import SendFriend from '../../components/friends/SendFriend';
import GetFriend from '../../components/friends/GetFriend';

// test용 스크린
export default function RequestFriends() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const onSelectSwitch = () => {
        navigation.navigate('FriendsList');
      };

    return (
      <View style={styles.container}>
        <TextInput 
        value={search}
        style={styles.input}
        onChangeText={setSearch}
        placeholder='요청하고 싶은 친구의 아이디를 검색해보세요!'
        placeholderTextColor={'rgba(0,0,0,0.5)'}/>
        <View style={styles.subcontainer}>
            <View style={styles.container}>
            <Text style={styles.label}>보낸 요청</Text>
            <ScrollView style={styles.firstscroll} contentContainerStyle={{alignItems: 'center'}}>
            <SendFriend />
            </ScrollView>
            <Text style={styles.label}>빋은 요청</Text>
            <ScrollView style={styles.secondscroll} contentContainerStyle={{alignItems: 'center'}}>
              <GetFriend />
            </ScrollView>
            </View>
        </View>
    <View style={styles.switch}>
    <TouchableOpacity onPress={() => onSelectSwitch()}>
    <CustomSwitch
    selectionMode={2}
        />
        </TouchableOpacity>
    </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#151515',
    },
    subcontainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
    },
    firstscroll: {
        width: '90%',
        height: '56%',
        marginTop: 40,
        marginBottom: 10,
    },
    secondscroll: {
        width: '90%',
        height: '30%',
        marginTop: 40,
    },
    label: {
      width: '90%',
      textAlign: 'left',
      color: '#ffffff',
      fontSize: 14,
      marginTop: 20,
      fontWeight: '700',
    },
    input: {
      width: '90%',
      backgroundColor: '#ffffff',
      fontSize: 14,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 7,
      marginTop: 30,
    },
    scrollbox: {
        width: '90%',
        marginTop: 10,
    },
    switch: {
        marginTop: -30,
        zIndex: 100,
    },
  });