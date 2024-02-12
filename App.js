import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* 네비게이션 스타일 */
import { backbtncolorbar } from './src/components/navigation/bar/BackBtnColorBar';

/* screens */
import Second from './src/screens/test/Second';
import Third from './src/screens/test/Third';
import First from './src/screens/test/First';
import Account from './src/screens/account/Account';
import Agreement from './src/screens/account/Agreement';
import KakaoLoginScreen from './src/screens/login/KakaoLogin';
import GoogleLoginScreen from './src/screens/sign/GoogleLogin';
import GetProfile from './src/screens/account/Getprofile';
import Login from './src/screens/login/Login';
import OnBoarding from './src/screens/onboarding/OnBoarding';
import { TouchableOpacity } from 'react-native';

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
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false}}/> 
        <Stack.Screen name="Login" component={Login} options={{...backbtncolorbar, title: '로그인'}} />
        <Stack.Screen name="Account" component={Account} options={{...backbtncolorbar, title: '가입하기'}}/>
        <Stack.Screen name="Agreement" component={Agreement} options={{...backbtncolorbar, title: '가입하기'}}/>
        <Stack.Screen name="GetProfile" component={GetProfile} options={{...backbtncolorbar, title: '프로필 추가 정보'}}/>
        <Stack.Screen name="KakaoLogin" component={KakaoLoginScreen} />
        <Stack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;