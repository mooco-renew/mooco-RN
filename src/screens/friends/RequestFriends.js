import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
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


// test용 스크린
export default function RequestFriends() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [firstview, setFirstView] = useState(false);
    const [secondview, setSecondView] = useState(false);
    const [requestId, setRequestId] = useState(null);
    const [receiveId, setReceiveId] = useState(null);
    const [receivedList, setReceivedList] = useState({ receiceRequestList: [] }); 
    const [sentList, setSentList] = useState({ sendRequestDtoList: [] }); 

    useEffect(() => {
        const getList = async () => {
            const received_result = await getReceviedList();
            const sent_result = await getSentList();
            setReceivedList(receivedListData);
            setSentList(sentListData);
        };
        getList();
    }, []); 


    const onSelectSwitch = () => {
        navigation.navigate('FriendsList');
      };

    return (
      <View style={styles.container}>
         {firstview ? ( < SendFriendAlert setFirstView={setFirstView}/>) : ( <></> )}
         {secondview ? ( < GetFriendAlert setSecondView={setSecondView} receiveId={receiveId} />) : ( <></> )}
         <View style={styles.inputcontainer}>
          <View style={styles.search}>
        <SearchSvg />
        </View>
        <TextInput 
        value={search}
        style={styles.input}
        onChangeText={setSearch}
        placeholder='추가하고 싶은 친구의 아이디를 검색해보세요!'
        placeholderTextColor={'rgba(0,0,0,0.5)'}/>
        </View>
        <View style={styles.subcontainer}>
            <View style={styles.container}>
            <Text style={styles.label}>보낸 요청</Text>
            <ScrollView style={styles.firstscroll} contentContainerStyle={{alignItems: 'center'}}>
            {receivedList.receiceRequestList.map((value, index) => (
            <SendFriend key={index} setFirstView={setFirstView} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId} />
          ))}
            </ScrollView>
            <Text style={styles.label}>빋은 요청</Text>
            <ScrollView style={styles.secondscroll} contentContainerStyle={{alignItems: 'center'}}>
              {sentList.sendRequestDtoList.map((value, index) => (
            <GetFriend key={index} setSecondView={setSecondView} setReceiveId={setReceiveId} nickname={value.nickname} identifierId={value.identifierId} profileImageUrl={value.profileImageUrl} userId={value.userId} />
          ))}
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
        marginTop: 10,
    },
    switch: {
        marginTop: -30,
        zIndex: 100,
    },
  });