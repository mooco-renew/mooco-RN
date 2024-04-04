import { SERVER_HOST } from "@env";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import SettingSvg from "../../assets/images/setting/setting";
import DailyBarcodeTab from "../../components/profiletab/DailyBarcodeTab";
import EventBarcodeTab from "../../components/profiletab/EventBarcodeTab";
import getProfileData from "../../server/profile/getProfileData";
// import sendRequest from "../../server/test/makeBarcode";

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
  // const [loading, setLoading] = useState(false);

  // const handleBarcodeCreation = async () => {
  //   setLoading(true);
  //   await sendRequest();
  //   setLoading(false);
  // };
  // 바코드 만들기 테스트
  const navigation = useNavigation();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileData();
        setProfileData(data);
      } catch (error) {
        console.error("프로필 데이터 에러", error);
      }
    };

    fetchProfileData();
  }, []);

  const navigateToSettings = () => {
    navigation.navigate("Setting");
  };

  if (!profileData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity onPress={navigateToSettings}>
          <View style={styles.settingIcon}>
            <SettingSvg />
          </View>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: profileData.profileImgUrl }}
            style={{ width: 138, height: 138, borderRadius: 100, margin: 10 }}
          />
          <Text style={styles.profileName}>{profileData.nickname}</Text>
          <Text style={styles.profileTag}>@{profileData.identifierId}</Text>
        </View>
      </View>
      {/* <TouchableOpacity onPress={handleBarcodeCreation} style={styles.button}>
        <Text style={styles.buttonText}>바코드 생성</Text>
      </TouchableOpacity> */}
      <Tab.Navigator
        initialRouteName="데일리 바코드"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: {
            backgroundColor: "#D0D0D0",
            width: "20%",
            height: 3,
            marginLeft: "11%",
          },
          tabBarStyle: {
            backgroundColor: "#151515",
          },
        }}
      >
        <Tab.Screen name="데일리 바코드">
          {() => <DailyBarcodeTab profileData={profileData} />}
        </Tab.Screen>
        <Tab.Screen name="이벤트 바코드" component={EventBarcodeTab} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  profile: {
    backgroundColor: "#151414",
  },
  settingIcon: {
    alignItems: "flex-end",
    padding: 10,
  },
  profileInfo: {
    alignItems: "center",
    paddingBottom: 20,
  },
  profileName: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
  },
  profileTag: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  // button: {
  //   backgroundColor: "#FFD700",
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  //   alignSelf: "center",
  //   marginVertical: 20,
  // },
  // buttonText: {
  //   color: "#000000",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  disabled: {
    opacity: 0.5,
  },
});
