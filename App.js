import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Second from "./src/screens/test/Second";
import Third from "./src/screens/test/Third";
import First from "./src/screens/test/First";
import Daily from "./src/screens/daily/Daily";

// rn navigatior로 stack 생성, rn은 stack으로 사용자의 이동을 확인한다.
const Stack = createNativeStackNavigator();

/*
screen 숨기고 싶으면 아래 코드로 변경(스크린 옵션 추가)
<Stack.Navigator screenOptions={{ headerShown: false }}>)
 */

// 맨 위 코드가 첫 번째 스크린
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={First} />
        <Stack.Screen name="Second" component={Second} />
        <Stack.Screen name="Third" component={Third} />
        <Stack.Screen name="Daily" component={Daily} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
