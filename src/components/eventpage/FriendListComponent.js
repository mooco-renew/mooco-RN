import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const FriendListComponent = ({ data = [], keyword, onFriendSelection }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleFriendSelection = (id) => {
    // 이미 선택된 친구인지 확인
    const isSelected = selectedFriends.includes(id);
    if (isSelected) {
      // 이미 선택된 경우 선택 취소
      setSelectedFriends(selectedFriends.filter((friendId) => friendId !== id));
    } else {
      // 선택되지 않은 경우 선택 추가
      setSelectedFriends([...selectedFriends, id]);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.id.toLowerCase().includes(keyword.toLowerCase()) ||
      item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {filteredData.map((item) => (
        <View key={item.id} style={styles.friendItem}>
          <Image source={item.image} style={styles.friendImage} />
          <View style={styles.friendInfo}>
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendId}>{item.id}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.addButton,
              selectedFriends.includes(item.id) && styles.selectedButton,
            ]}
            onPress={() => handleFriendSelection(item.id)}
          >
            <Text style={styles.addButtonText}>
              {selectedFriends.includes(item.id) ? "✔️" : "추가"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      {filteredData.length === 0 && keyword !== "" && (
        <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  friendId: {
    color: "white",
    fontSize: 10,
  },
  addButton: {
    padding: 5,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: "auto",
  },
  selectedButton: {},
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noResultText: {
    color: "white",
  },
});

export default FriendListComponent;
