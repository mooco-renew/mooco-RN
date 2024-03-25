import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import NoEvent from "./NoEvent";
import EventScreen from "./EventScreen";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

export default function EventPage() {
  const navigation = useNavigation();
  const [view, setView] = useState(false);
  const [calendarCount, setCalendarCount] = useState(0);

  useEffect(() => {
    // API를 호출하여 사용자의 캘린더 개수를 가져옵니다.
    const fetchCalendarCount = async () => {
      try {
        const response = await fetch("/api/v1/groups");
        const data = await response.json();
        setCalendarCount(data.length);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarCount(); // 함수를 호출하여 캘린더 데이터 개수를 가져옵니다.
  }, []);

  // 캘린더 개수에 따라서 화면을 전환합니다.
  return (
    <View>
      {calendarCount > 0 ? (
        <NoEvent navigation={navigation} />
      ) : (
        <EventScreen navigation={navigation} />
        // <NoEvent navigation={navigation} />
      )}
    </View>
  );
}
