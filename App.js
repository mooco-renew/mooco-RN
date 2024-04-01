import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./src/services/navigation/NavigationService"; // 전역 네비 관리

/* 네비게이션 스타일 */
import { backbtncolorbar } from "./src/components/navigation/bar/BackBtnColorBar";
import { nonebackbtncolorbar } from "./src/components/navigation/bar/NoneBackButton";

/* screens */
import Daily from "./src/screens/daily/Daily";
import KakaoLoginScreen from "./src/screens/sign/KakaoLogin";
import GetProfile from "./src/screens/sign/Getprofile";
import OnBoarding from "./src/screens/onboarding/OnBoarding";
import FriendsList from "./src/screens/friends/FriendsList";
import RequestFriends from "./src/screens/friends/RequestFriends";
import DailyPost from "./src/screens/daily/DailyPost";
import DailyUpload from "./src/screens/daily/DailyUpload";
import AppBar from "./src/components/navigation/bar/AppBar";
import { NativeBaseProvider } from "native-base";
import HomeTab from "./src/screens/homeTab/homeTab";
import Account from "./src/screens/sign/Account";
import Login from "./src/screens/sign/Login";
import FindPw from "./src/screens/auth/findPw";
import FindId from "./src/screens/auth/findId";
import EventPage from "./src/screens/eventpage/FirstEventpage";
import GroupCreate from "./src/screens/eventpage/GroupCreate";
import { useFonts } from "expo-font";
// rn navigatior로 stack 생성, rn은 stack으로 사용자의 이동을 확인한다.
const Stack = createNativeStackNavigator();

/*
screen 숨기고 싶으면 아래 코드로 변경(스크린 옵션 추가)
<Stack.Navigator screenOptions={{ headerShown: false }}>)
 */

// 맨 위 코드가 첫 번째 스크린
function App() {
  const [fontsLoaded] = useFonts({
    "Plaster-Regular": require("./src/assets/fonts/Plaster-Regular.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <NavigationContainer ref={navigationRef}>
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
            name="Login"
            component={Login}
            options={{ ...backbtncolorbar, title: "로그인" }}
          />
          <Stack.Screen
            name="FindPw"
            component={FindPw}
            options={{ ...backbtncolorbar, title: "비밀번호 찾기" }}
          />
          <Stack.Screen
            name="FindId"
            component={FindId}
            options={{ ...backbtncolorbar, title: "아이디 찾기" }}
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

          <Stack.Screen
            name="EventPage"
            component={EventPage}
            options={{ ...backbtncolorbar, title: "EventPage" }}
          />

          <Stack.Screen
            name="GroupCreatePage"
            component={GroupCreate}
            options={{ ...backbtncolorbar, title: "새 그룹 생성" }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
