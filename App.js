import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* 네비게이션 스타일 */
import { backbtncolorbar } from "./src/components/navigation/bar/BackBtnColorBar";

/* screens */
import Daily from "./src/screens/daily/Daily";
import Agreement from "./src/screens/account/Agreement";
import KakaoLoginScreen from "./src/screens/login/KakaoLogin";
import GetProfile from "./src/screens/account/Getprofile";
import OnBoarding from "./src/screens/onboarding/OnBoarding";
import FriendsList from "./src/screens/friends/FriendsList";
import RequestFriends from "./src/screens/friends/RequestFriends";
import DailyPost from "./src/screens/daily/DailyPost";
import DailyUpload from "./src/screens/daily/DailyUpload";
import AppBar from "./src/components/navigation/bar/AppBar";
import { NativeBaseProvider } from "native-base";
import HomeTab from "./src/screens/homeTab/homeTab";
import Account from "./src/screens/account/Account";
import Login from "./src/screens/login/Login";
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
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Account"
            component={Account}
            options={{ ...backbtncolorbar, title: "회원가입" }}
          />
          <Stack.Screen
            name="Agreement"
            component={Agreement}
            options={{ ...backbtncolorbar, title: "이용 약관 동의서" }}
          />
           <Stack.Screen
            name="Login"
            component={Login}
            options={{ ...backbtncolorbar, title: "로그인" }}
          />
          <Stack.Screen
            name="GetProfile"
            component={GetProfile}
            options={{ ...backbtncolorbar, title: "프로필 등록" }}
          />
          <Stack.Screen name="KakaoLogin" component={KakaoLoginScreen} />
          <Stack.Screen
            name="FriendsList"
            component={FriendsList}
            options={{ ...backbtncolorbar, title: "친구 목록 및 추가" }}
          />
          <Stack.Screen
            name="RequestFriends"
            component={RequestFriends}
            options={{ ...backbtncolorbar, title: "친구 요청" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTab}
            options={({ navigation }) => AppBar({ navigation })}
          />
          <Stack.Screen name="Daily" component={Daily} />
          <Stack.Screen
            name="DailyPost"
            component={DailyPost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DailyUpload"
            component={DailyUpload}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
