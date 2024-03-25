import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventPlusBtn from "../../assets/images/eventpage/Event_create.png";
import EventList from "../../components/eventpage/EventList";
import axios from "axios";
import { StyleSheet } from "react-native";
import OpenCalendar from "../../components/eventpage/OpenCalendar";

const GroupList = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/groups");
      setUsers(response.data); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleImagePress = () => {
    navigation.navigate("GroupCreatePage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={EventPlusBtn} style={styles.image} />
        </TouchableOpacity>
        <View>
          <View style={styles.GroupListContainer}>
            <Text style={styles.containerTitle}>그룹 목록</Text>
            <View style={styles.calendarContainer}>
              <View style={styles.CalendarList}>
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollViewContent}
                  showsVerticalScrollIndicator={false}
                >
                  <EventList />
                  {/* <OpenCalendar /> */}
                  <EventList />
                  <EventList />
                  <EventList />
                  <EventList />
                  <EventList />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GroupList;

const styles = StyleSheet.create({
  container: {
    top: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 370,
    height: 130,
    borderRadius: 10,
  },
  GroupListContainer: {
    width: "100%",
    flex: 1,
  },

  calendarContainer: {
    top: 20,
    alignItems: "center",
    flex: 1,
  },
  containerTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 30,
  },

  CalendarList: {
    borderColor: "red",
    height: 450,
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 20,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
