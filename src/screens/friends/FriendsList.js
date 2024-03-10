import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import DeleteFriend from '../../components/friends/DeleteFriend';
import CustomSwitch from '../../components/switch/CustomSwitch';
import DeleteFriendAlert from '../../components/alert/deletefriendalert';
import SearchSvg from '../../assets/images/friends/search';
import getFriendsList from '../../server/friends/friends-list';
import friendsList from '../../data/friends/friends-list';
import searchFriends from '../../server/friends/search-friend';

// test용 스크린
export default function FriendsList() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [view, setView] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState({ friendList: [] }); 

    useEffect(() => {
        const getList = async () => {
            const result = await getFriendsList(); 
            setData(result); 
        };
        getList();
    }, []); 

    // 검색 함수
    const handleSearchChange = (text) => {
      setSearch(text);  // onChange 텍스트 업데이트
      searchFriends(text); // text로 검색
  };

    const onSelectSwitch = () => {
        navigation.navigate('RequestFriends');
      };

    return (
      <View style={styles.container}>
        {view ? ( <DeleteFriendAlert setView={setView} selectedId={selectedId} />) : ( <></> )}
        <View style={styles.inputcontainer}>
          <View style={styles.search}>
        <SearchSvg />
        </View>
        <TextInput 
        value={search}
        style={styles.input}
        onChangeText={handleSearchChange}
        placeholder='추가하고 싶은 친구의 아이디를 검색해보세요!'
        placeholderTextColor={'rgba(0,0,0,0.5)'}/>
        </View>
        <View style={styles.subcontainer}>
            <Text style={styles.label}>친구 목록</Text>
             <ScrollView style={styles.scrollbox} contentContainerStyle={{alignItems: 'center'}}>
             {data.friendList.map((value, index) => (
            <DeleteFriend key={index} setView={setView} setSelectedId={setSelectedId} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId}/>
          ))}
             </ScrollView>
        </View>
    <View style={styles.switch}>
      <TouchableOpacity onPress={() => onSelectSwitch()}>
    <CustomSwitch
    selectionMode={1}
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
      backgroundColor: '#000000',
    },
    inputcontainer: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    search: {
      top: 15,
      left: 35,
      zIndex: 10,
    },
    subcontainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
    },
    firstscroll: {
        width: '90%',
        height: '56%',
        marginTop: 30,
        marginBottom: 10,
    },
    secondscroll: {
        width: '90%',
        height: '30%',
        marginTop: 30,
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
      paddingHorizontal: 43,
      paddingVertical: 14,
      marginTop: 30,
    },
    scrollbox: {
        width: '90%',
        marginTop: 30,
    },
    switch: {
        marginTop: -30,
        zIndex: 100,
    },
  });