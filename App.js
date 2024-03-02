import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* 네비게이션 스타일 */
import { backbtncolorbar } from './src/components/navigation/bar/BackBtnColorBar';

/* screens */
import KakaoLoginScreen from './src/screens/login/KakaoLogin';
import GoogleLoginScreen from './src/screens/login/GoogleLogin';
import GetProfile from './src/screens/account/Getprofile';
import OnBoarding from './src/screens/onboarding/OnBoarding';
import FriendsList from './src/screens/friends/FriendsList';
import RequestFriends from './src/screens/friends/RequestFriends';
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
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false}}/> 
        <Stack.Screen name="GetProfile" component={GetProfile} options={{...backbtncolorbar, title: '프로필 편집'}}/>
        <Stack.Screen name="KakaoLogin" component={KakaoLoginScreen} />
        <Stack.Screen name="GoogleLogin" component={GoogleLoginScreen} />

        <Stack.Screen name="FriendsList" component={FriendsList} options={{...backbtncolorbar, title: '친구 목록 및 추가'}} />
        <Stack.Screen name="RequestFriends" component={RequestFriends} options={{...backbtncolorbar, title: '친구 요청'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;