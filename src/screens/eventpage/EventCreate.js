import React, { useState } from "react";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

import EventPlusBtn from "../../assets/images/eventpage/AddCircle.png";
import FriendList from "../../components/eventpage/FriendList";

export default function EventCreate() {
  const navigation = useNavigation();
  const [showFriendList, setShowFriendList] = useState(false);

  const handleImagePress = () => {
    navigation.navigate("EventCreatePage");
  };

  const handlePlusBtnPress = () => {
    setShowFriendList(!showFriendList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.contentText}>캘린더 이름</Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={false}
            //enter치면 키보드 사라짐
            blurOnSubmit={true}
            style={styles.input}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View style={styles.friendContainer}>
        <Text style={styles.contentText}>함께할 사람 초대하기</Text>
        <TouchableOpacity onPress={handlePlusBtnPress}>
          <Image
            source={EventPlusBtn}
            style={styles.image}
            onPress={handlePlusBtnPress}
          />
        </TouchableOpacity>
        {showFriendList && <FriendList />}
      </View>
      <View style={styles.confirmContainer}>
        <View style={styles.confirmBox}>
          <TouchableOpacity onPress={handleImagePress}>
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
