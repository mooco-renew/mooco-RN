import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import DeleteFriend from '../../components/friends/DeleteFriend';
import CustomSwitch from '../../components/switch/CustomSwitch';
import DeleteFriendAlert from '../../components/alert/deletefriendalert';
import SearchSvg from '../../assets/images/friends/search';
import getFriendsList from '../../server/friends/friends-list';
import friendsList from '../../data/friends/friends-list';
import searchList from '../../data/friends/search-list';
import searchFriends from '../../server/friends/search-friend';
import SendFriend from '../../components/friends/SendFriend';
import SendFriendAlert from '../../components/alert/sendfriendalert';

// test용 스크린
export default function FriendsList() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [firstview, setFirstView] = useState(false);
    const [secondview, setSecondView] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState(friendsList.friendList); 
    const [searchData, setSearchData] = useState(searchList.userInfoList); 

    useEffect(() => {
        const getList = async () => {
            const result = await getFriendsList(); 
            if(result.success == true) {
            setData(result.data.friendList); 
            } else if(result.success == false) {
              alert(result.error.message);
            }
        };
        getList();
    }, []); 

    // 검색 함수
    const handleSearchChange = async (text) => {
      setSearch(text);  // onChange 텍스트 업데이트

      if(text != "") {
        const result = await searchFriends(text); // text로 검색
        if(result.success == true) {
          setSearchData(result.data.userInfoList);
        } else if(result.success == false) {
          alert(result.error.message);
        }
      } else {
        const result = await getFriendsList(); 
        if(result.success == true) {
           setData(result.data.friendList); 
        } else if(result.success == false) {
          alert(result.error.message);
        }
      }
  };

    const onSelectSwitch = () => {
        navigation.navigate('RequestFriends');
      };

    return (
      <View style={styles.container}>
        {secondview ? ( <DeleteFriendAlert setView={setSecondView} selectedId={selectedId} setData={setData}/>) : ( <></> )}
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
        {search != "" && (
          <View style={styles.subcontainer}>
          <Text style={styles.label}>검색 결과</Text>
             <ScrollView style={styles.scrollbox} contentContainerStyle={{alignItems: 'center'}}>
             {searchData.map((value, index) => (
            <SendFriend key={index} setSelectedId={setSelectedId} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId}/>
          ))}
             </ScrollView>
      </View>
        )}
        {search == "" && (
           <View style={styles.subcontainer}>
           <Text style={styles.label}>친구 목록</Text>
              <ScrollView style={styles.scrollbox} contentContainerStyle={{alignItems: 'center'}}>
              {data.map((value, index) => (
             <DeleteFriend key={index} setView={setSecondView} setSelectedId={setSelectedId} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId}/>
           ))}
              </ScrollView>
       </View>
        )}
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