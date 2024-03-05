import React from "react";
import {View, StyleSheet, Platform} from "react-native";
import {WebView} from 'react-native-webview';
import { REST_API_KEY, REDIRECT_URI, INJECTED_JAVASCRIPT, SERVER_HOST } from "@env";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function KakaoLoginScreen({ navigation }) {
	var _REDIRECT_URI = REDIRECT_URI;

	// 인가코드 발급
	const getCode = (target) => {
		const exp = 'code=';
		const condition = target.indexOf(exp);
        console.log('exp : ', exp);
        console.log('condition: ', condition);
		if (condition !== -1) {
            // 인가 코드 발급
			const requestCode = target.substring(condition + exp.length);
			console.log('code = ', requestCode);
			getToken(requestCode);
		}
	};
    
	// access token 받기
	const getToken = async (code) => {
		const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';
		var accessToken = "none";
		axios ({
			method: 'post',
			url: requestTokenUrl,
			params: {
				grant_type: 'authorization_code',
				client_id: REST_API_KEY,
				redirect_uri: REDIRECT_URI,
				code: code,
			},
		}).then((response) => {
			accessToken = response.data.access_token;
			//서버 통신
			postToken(accessToken);
		}).catch(function (error) {
			console.log('error : ', error);
		})
	};

	// 서버로 코드 전송 후 토큰 받아오기
	const postToken = async (accessToken) => {

		const data = {
			"accessToken": accessToken,
			"provider": "Kakao"
		  };

		const config = {
			headers: {
			  'Content-Type': 'application/json',
			}
		};
		
		try {
		  const response = await axios.post(`${SERVER_HOST}/api/v1/auth/kakao`, data, config);
		  console.log('성공 !: ', response.data);
			storeData(response.data.data.accessToken); // store에 token 저장
			if(!response.data.data.isExisted) {
				navigation.navigate('GetProfile'); // 추가 정보 입력
			} else {
				navigation.navigate('OnBoarding'); // 메인
			}
		} catch (error) {
		  console.error('에러가 있습니다. ', error);
		}
	  };

	const storeData = async (returnValue) => {
		try {
			await AsyncStorage.setItem('access_token', returnValue);
		} catch (error) {
			console.log('토큰 저장에 실패하였습니다. ', error);
		}
	}

	return Platform.OS === "web" ? (
        <iframe src="https://www.somedomain.com/" height={'100%'} width={'100%'} />
      ) : (
		<View style={{ flex: 1 }}>
			<WebView
				style={{ flex: 1 }}
				source={{
					uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${_REDIRECT_URI}`,
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