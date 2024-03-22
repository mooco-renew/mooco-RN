import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";

//image import
import EventPlusBtn from "../../assets/images/eventpage/AddCircle.png";

//component import
import FriendList from "../../components/eventpage/FriendList";

export default function GroupCreate() {
  const navigation = useNavigation();
  const [showFriendList, setShowFriendList] = useState(false);
  const [calendarName, setCalendarName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleImagePress = async () => {
    if (calendarName === "") {
      Alert.alert("", "그룹 이름을 작성해주세요!");
      return;
    }

    const eventData = {
      calendarName: calendarName,
      selectedFriends: selectedFriends,
    };

    try {
      const response = await fetch("/api/v1/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      Alert.alert("Success", "그룹이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert("Error", "그룹을 생성하는 중에 오류가 발생했습니다.");
    }
  };

  const handlePlusBtnPress = () => {
    setShowFriendList(!showFriendList);
  };

  const handleFriendSelection = (selected) => {
    setSelectedFriends(selected);
  };

  const handleCalendarNameChange = (text) => {
    setCalendarName(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.contentText}>캘린더 이름</Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={false}
            blurOnSubmit={true}
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={handleCalendarNameChange}
            value={calendarName}
            placeholder="그룹 이름을 입력하세요"
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
        {showFriendList && (
          <FriendList onFriendSelection={handleFriendSelection} />
        )}
      </View>
      <View style={styles.confirmContainer}>
        <View style={styles.confirmBox} onPress={handleImagePress}>
          <TouchableOpacity onPress={handleImagePress}>
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
  },
  nameContainer: {},

  contentText: {
    left: 30,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
    paddingBottom: 3,
    width: "80%",
    left: 30,

    marginBottom: 50,
  },
  input: {
    fontSize: 16,
    color: "#000000",
    // paddingTop: 5,
  },

  friendContainer: {
    marginBottom: 20,
    overflow: "hidden",
  },

  image: {
    width: 30,
    height: 30,
    // top: 20,
    left: 30,
  },

  confirmContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBox: {
    backgroundColor: "#151515",
    width: "83%",
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmText: { color: "white" },
});
