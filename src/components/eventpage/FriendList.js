import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import catImg from "../../assets/images/eventpage/cat.jpeg";

import searchIcon from "../../assets/images/eventpage/Search.png";
import FriendListComponent from "./FriendListComponent";

const dummyData = [
  { id: "@gjdjd76", name: "Wook", image: catImg },
  { id: "@9gjdjgjdh4", name: "Brian" },
  { id: "@fjgjdn4jf", name: "Justin" },
  { id: "@fjgjdn4jf3", name: "Wooky" },
];

export default FriendList = ({ onFriendSelection }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // API 호출 대신에 더미 데이터 임시
    setList(dummyData);
  }, []);

  const onChangeKeyword = (text) => {
    setKeyword(text);
  };

  const handleFriendSelection = (selectedId) => {
    onFriendSelection(selectedId);
  };

  return (
    <View style={styles.wholecontainer}>
      <View style={styles.container}>
        <Text style={styles.title}>친구 목록</Text>
        <View style={styles.searchContainer}>
          <Image source={searchIcon} style={styles.searchicon} />
          <TextInput
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={"#929292"}
            style={styles.textInput}
            placeholder="추가하고 싶은 친구의 아이디를 검색해보세요!"
            value={keyword}
          />
        </View>
        <View style={styles.friendlist}>
          <ScrollView>
            <FriendListComponent
              data={list}
              keyword={keyword}
              onFriendSelection={handleFriendSelection}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholecontainer: {
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    width: "90%",
    height: 300,
    backgroundColor: "#151515",
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 15,
    padding: 15,
    fontWeight: "600",
  },

  searchContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },

  searchicon: {
    width: 20,
    height: 20,
    position: "absolute",
    zIndex: 9,
    left: 50,
  },

  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 12,
    paddingLeft: 40,
  },

  friendlist: {
    height: 200,
    top: 10,
  },
});
