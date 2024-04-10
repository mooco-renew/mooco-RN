import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
// 네비게이션 사용을 위한 useNavigation 훅 임포트
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

const ServerErrorPage = () => {
  const navigation = useNavigation();

  const onServerError = () => {
    // 현재 네비게이션 스택을 재설정하고 'OnBoarding' 화면으로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: "OnBoarding" }],
    });
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Icon
          name="error-outline"
          size={60}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.title}>서비스 상태가 원활하지 않습니다.</Text>
        <Text style={styles.message}>잠시 후 다시 이용 부탁드립니다.</Text>
        <Text style={styles.apology}>이용에 불편을 드려 죄송합니다.</Text>
        <TouchableOpacity style={styles.button} onPress={onServerError}>
          <Text style={styles.buttonText}>메인화면으로</Text>
        </TouchableOpacity>
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
    fontFamily: "SUIT-Bold",
    marginBottom: 14,
    color: "white",
  },
  message: {
    fontSize: 18,
    marginBottom: 5,
    color: "#626262",
    fontFamily: "SUIT-SemiBold",
  },
  apology: {
    fontSize: 18,
    marginBottom: 30,
    color: "#626262",
    fontFamily: "SUIT-SemiBold",
  },
  button: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SUIT-SemiBold",
  },
});

export default ServerErrorPage;
