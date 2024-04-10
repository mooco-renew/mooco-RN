import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// 네비게이션 사용을 위한 useNavigation 훅 임포트
import { NativeBaseProvider } from "native-base";

const PreparePage = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="calendar-heart"
          size={60}
          color="#63495C"
          style={styles.icon}
        />
        <Text style={styles.title}>서비스 준비 중이에요</Text>
        <Text style={styles.content}>새로운 업데이트를 기대해주세요!</Text>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: "white",
    fontFamily: "SUIT-ExtraBold",
  },
  content: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
    fontFamily: "SUIT-Bold",
  },
});

export default PreparePage;
