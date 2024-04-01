import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEBCLIENTID, IOSCLIENTID } from "@env";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import GoogleLogoSvg from '../../assets/images/sign/googlelogo';
import KakaoLogoSvg from '../../assets/images/sign/kakaologo';
import postGoogleToken from '../../server/sign/postGoogleToken';

export default function SocialButton() {
    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: WEBCLIENTID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
        iosClientId: IOSCLIENTID,
      });

  return (
    <View style={styles.socialcontainer}>
    <TouchableOpacity onPress={
      async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const isSignedIn = await GoogleSignin.isSignedIn();
          if (!isSignedIn) {
            await GoogleSignin.signIn();
          } 
          const data = await GoogleSignin.getTokens(); // 토큰을 얻습니다.
          console.log('token : ', data.accessToken);
          postGoogleToken(data.accessToken, navigation);
        } catch (error) {
          console.log('실패 ', error);
        } 
      }
    }>
        <GoogleLogoSvg />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('KakaoLogin')}>
        <KakaoLogoSvg />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    socialcontainer: {
        flexDirection: 'row',
        width: '32%',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
      },
});