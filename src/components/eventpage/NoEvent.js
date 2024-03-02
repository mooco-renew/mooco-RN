import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./NoEventStyle";

import EventPlusBtn from "../../assets/images/eventpage/NoEventPlusBtn.png";

const NoEvent = () => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate("EventCreatePage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={EventPlusBtn} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.TitleText}>이벤트 캘린더를 생성하세요</Text>
        <Text style={styles.ContentText}>
          특별한 추억을 기록으로 남겨보세요.{"\n"}
          친구들을 초대해 함께 기록할 수 있어요
        </Text>
      </View>
    </View>
  );
};
export default NoEvent;
