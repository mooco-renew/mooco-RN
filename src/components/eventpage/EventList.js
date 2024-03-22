import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

//image import
import catImg from "../../assets/images/eventpage/cat.jpeg";
import EventgroupList from "../../data/eventpage/eventgroupList";

const EventList = () => {
  const [calendarTitle, setCalendarTitle] = useState(EventgroupList.data);
  // 가짜 사용자 데이터
  const users = [
    { id: 1, name: "User 1", image: catImg },
    { id: 2, name: "User 2", image: catImg },
    { id: 3, name: "User 3", image: catImg },
    { id: 4, name: "User 4", image: catImg },
    { id: 5, name: "User 5", image: catImg },
    // 추가 사용자들...
  ];

  useEffect(() => {
    // API 호출하여 캘린더 제목 가져오기 (더미 API 호출)
    // fetchCalendarTitle();
  }, []);

  // 최대 표시할 사용자 수
  const maxVisibleUsers = 4;

  return (
    <View style={styles.EventListContainer}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>mooco</Text>
        <View style={styles.profileImagesContainer}>
          {users.slice(0, maxVisibleUsers).map((user, index) => (
            <Image
              key={user.id}
              source={user.image}
              style={[styles.profileImage, { zIndex: users.length + index }]}
            />
          ))}
          {users.length > maxVisibleUsers && (
            <View
              style={[styles.profileImage, styles.additionalCountContainer]}
            >
              <Text style={styles.additionalCountText}>
                +{users.length - maxVisibleUsers}
              </Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity>
        <View
          style={styles.calendarOpenContainer}
          onPress={() => handleCalendarSelection(item.id)}
        >
          <View style={styles.calendarOpen}>
            <Text>캘린더 열람하기</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  EventListContainer: {
    marginBottom: 40,
    width: "100%",
  },

  calendarTitle: {
    fontSize: 25,
    fontWeight: "600",
  },

  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  profileImagesContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -15,
  },

  additionalCountContainer: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },

  additionalCountText: {
    color: "white",
    fontWeight: "bold",
  },

  calendarOpenContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  calendarOpen: {
    width: "100%",
    height: 30,
    borderColor: "black",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default EventList;
