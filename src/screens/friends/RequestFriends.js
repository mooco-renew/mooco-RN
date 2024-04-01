import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import CustomSwitch from '../../components/switch/CustomSwitch';
import GetFriend from '../../components/friends/GetFriend';
import SendFriendAlert from '../../components/alert/sendfriendalert';
import GetFriendAlert from '../../components/alert/getfriendalert';
import SendFriend from '../../components/friends/SendFriend';
import getReceviedList from '../../server/friends/recevied-list';
import getSentList from '../../server/friends/sent-list';
import receivedListData from '../../data/friends/received-list';
import sentListData from '../../data/friends/sent-list';
import SearchSvg from '../../assets/images/friends/search';
import searchFriends from '../../server/friends/search-friend';
import searchList from '../../data/friends/search-list';


// test용 스크린
export default function RequestFriends() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [receivedList, setReceivedList] = useState(receivedListData.receiceRequestList); 
    const [sentList, setSentList] = useState(sentListData.sendRequestDtoList); 
    const [searchData, setSearchData] = useState(searchList.userInfoList);

    useEffect(() => {
        const getList = async () => {
            const received_result = await getReceviedList();
            const sent_result = await getSentList();
            if(received_result.success == true && sent_result.success == true) {
            setReceivedList(received_result.data.receiceRequestList);
            setSentList(sent_result.data.sendRequestDtoList);
            } else if(received_result.success == false || sent_result.success == false) {
              alert(result.error.message);
            }
        };
        getList();
    }, []); 

    const onSelectSwitch = () => {
        navigation.navigate('FriendsList');
      };

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
        const received_result = await getReceviedList();
        const sent_result = await getSentList();
        if(received_result.success == true && sent_result.success == true) {
        setReceivedList(received_result.data.receiceRequestList);
        setSentList(sent_result.data.sendRequestDtoList);
        } else if(received_result.success == false || sent_result.success == false) {
          alert(result.error.message);
        }
      }
  };

    return (
      <View style={styles.container}>
         <KeyboardAvoidingView style={styles.inputcontainer}>
          <KeyboardAvoidingView style={styles.search}>
        <SearchSvg />
        </KeyboardAvoidingView>
        <TextInput 
        value={search}
        style={styles.input}
        onChangeText={handleSearchChange}
        placeholder='추가하고 싶은 친구의 아이디를 검색해보세요!'
        placeholderTextColor={'rgba(0,0,0,0.5)'}/>
        </KeyboardAvoidingView>
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
            <View style={styles.container}>
            <Text style={styles.label}>보낸 요청</Text>
            <ScrollView style={styles.firstscroll} contentContainerStyle={{alignItems: 'center'}}>
            {receivedList.map((value, index) => (
            <SendFriend key={index} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId} />
          ))}
            </ScrollView>
            <Text style={styles.label}>빋은 요청</Text>
            <ScrollView style={styles.secondscroll} contentContainerStyle={{alignItems: 'center'}}>
              {sentList.map((value, index) => (
            <GetFriend key={index} setReceivedList={setReceivedList} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId} />
          ))}
            </ScrollView>
            </View>
        </View>
        )}
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