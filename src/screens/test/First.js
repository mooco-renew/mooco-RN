import { View, Text, Button } from "react-native";

// test용 스크린
export default function First({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Screen</Text>
      <Text>페이지 추가, 이름 추가해서 네비게이터로 확인해주세요.</Text>
      <Button title="go Second" onPress={() => navigation.navigate("Second")} />
      <Button title="go Third" onPress={() => navigation.navigate("Third")} />
      <Button title="go Daily" onPress={() => navigation.navigate("Daily")} />
    </View>
  );
}
