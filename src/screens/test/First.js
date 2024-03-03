import { View, Text, Button } from "react-native";

// test용 스크린
export default function First({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Screen</Text>
      <Text>페이지 추가, 이름 추가해서 네비게이터로 확인해주세요.</Text>
      <Button
        title="go onBoarding"
        onPress={() => navigation.navigate("OnBoarding")}
      />
      <Button
        title="go KakaoLogin"
        onPress={() => navigation.navigate("KakaoLogin")}
      />
      <Button title="go Daily" onPress={() => navigation.navigate("Daily")} />
    </View>
  );
}
