import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const AppBar = ({ navigation }) => {
  const LeftIcon = () => <MaterialIcons name="group" size={24} color="white" />;
  const TitleText = () => (
    <Text color="white" fontFamily="Plaster-Regular">
      MOOCO
    </Text>
  );
  const RightIcon1 = () => (
    <MaterialIcons name="notifications" size={24} color="white" />
  );
  const RightIcon2 = () => (
    <MaterialIcons name="account-circle" size={24} color="white" />
  );

  return {
    headerBackVisible: false,
    headerLeft: () => (
      <TouchableOpacity onPress={() => {
        navigation.navigate('FriendsList');
      }}>
        <LeftIcon />
      </TouchableOpacity>
    ),
    headerTitle: () => <TitleText />,
    headerRight: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => {}}>
          <RightIcon1 />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <RightIcon2 />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: "black", // or any other color
    },
    headerTintColor: "white",
    headerTitleAlign: "center", // 타이틀을 수평 가운데로 정렬
    headerTitleContainerStyle: {
      left: 0, // 왼쪽 아이콘의 영역을 제외하고 전체 너비를 사용
      right: 0, // 오른쪽 아이콘의 영역을 제외하고 전체 너비를 사용
      bottom: 0, // 타이틀 컨테이너를 하단에 붙임
      alignItems: "center", // 수직 가운데 정렬
      justifyContent: "center", // 수평 가운데 정렬
    },
  };
};

export default AppBar;
