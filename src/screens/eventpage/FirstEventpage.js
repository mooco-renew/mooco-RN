import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import NoEvent from "../../components/eventpage/NoEvent";
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
  return (
    <View>
      <NoEvent navigation={navigation} />
    </View>
  );
}
