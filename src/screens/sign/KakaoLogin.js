import React from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";
import {
  REST_API_KEY,
  REDIRECT_URI,
  INJECTED_JAVASCRIPT,
} from "@env";
import axios from "axios";
import postKakaoToken from "../../server/sign/postKakaoToken";

export default function KakaoLoginScreen({ navigation }) {
  console.log(REDIRECT_URI, REST_API_KEY);

  // 인가코드 발급
  const getCode = (target) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    console.log("exp : ", exp);
    console.log("condition: ", condition);
    if (condition !== -1) {
      // 인가 코드 발급
      const requestCode = target.substring(condition + exp.length);
      console.log("code = ", requestCode);
      getToken(requestCode);
    }
  };

  // access token 받기
  const getToken = async (code) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";
    var accessToken = "none";
    axios({
      method: "post",
      url: requestTokenUrl,
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      },
    })
      .then((response) => {
        accessToken = response.data.access_token;
        console.log('토큰 발급 : ', accessToken);
        //서버 통신
        postKakaoToken(accessToken, navigation);
      })
      .catch(function (error) {
        console.log("error : ", error);
      });
  };

  return Platform.OS === "web" ? (
    <iframe src="https://www.somedomain.com/" height={"100%"} width={"100%"} />
  ) : (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
