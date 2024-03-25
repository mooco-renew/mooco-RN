import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { LocaleConfig, Calendar } from "react-native-calendars";

import eventDate from "../../data/eventpage/eventDate";

//image import
import calendarLogo from "../../assets/images/eventpage/CalendarLogo.png";
import EventPlusBtn from "../../assets/images/eventpage/AddCircle.png";

const OpenCalendar = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    // 이 곳에서 API를 호출하여 날짜 세트를 가져온다고 가정합니다.
    // 가져온 날짜들을 markedDates 객체에 추가합니다.
    const markedDates = {
      "2024-03-01": { startingDay: true, color: "white", textColor: "black" },
      "2024-03-05": { endingDay: true, color: "white", textColor: "black" },
    };
    setMarkedDates(markedDates);
  }, []);

  const handleImagePress = () => {
    navigation.navigate("GroupCreatePage");
  };

  return (
    <View>
      <View style={styles.EventListContainer}>
        <Image
          source={calendarLogo}
          style={styles.calendarLogo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={handleImagePress}>
          <View style={styles.newEventBtnContainer}>
            <View style={styles.newEventBtn}>
              <Image source={EventPlusBtn} style={styles.plusbtnImg} />
              <Text style={styles.newEventBtnFont}>새로운 이벤트 추가하기</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          theme={{
            backgroundColor: "black",
            calendarBackground: "black",
            monthTextColor: "white",
            arrowColor: "white",
            dayTextColor: "white",
            textSectionTitleColor: "white",
            todayTextColor: "white",
          }}
          markedDates={markedDates}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EventListContainer: {
    height: 100,
  },
  calendarLogo: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
  newEventBtnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  newEventBtn: {
    width: "100%",
    backgroundColor: "#151515",
    padding: 9,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  newEventBtnFont: { color: "white", fontWeight: "bold" },
  plusbtnImg: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  calendarContainer: {
    width: "98%",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default OpenCalendar;
