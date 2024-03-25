import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

//이미지 import
import EventPlusBtn from "../../assets/images/eventpage/NoEventPlusBtn.png";

const NoEvent = () => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate("GroupCreatePage");
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

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 60,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },

  TitleText: {
    fontSize: 28,
    fontWeight: "900",
    top: 30,
  },
  ContentText: {
    fontSize: 15,
    // color: "#FFFFFF",
    top: 40,
    textAlign: "center",
    lineHeight: 20,
  },
});
