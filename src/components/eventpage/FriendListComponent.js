import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const FriendListComponent = ({ data = [], keyword }) => {
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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>추가</Text>
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
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noResultText: {
    color: "white",
  },
});

export default FriendListComponent;
