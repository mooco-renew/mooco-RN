import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  Animated,
  ScrollView,
} from "react-native";
import getProfileData from "../../server/profile/getProfileData";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting() {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileData();
        console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error("프로필 데이터 에러", error);
      }
    };

    fetchProfileData();
  }, []);

  const [isLogoutPressed, setIsLogoutPressed] = useState(false);
  const [isDeleteAccountPressed, setIsDeleteAccountPressed] = useState(false);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLogoutSuccessVisible, setIsLogoutSuccessVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  // 개발중 상태 변수
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);

  const handleLogoutPress = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = async () => {
    //TODO 로그아웃 로직 작성

    await Promise.all([
            AsyncStorage.removeItem("access_token"),
            AsyncStorage.removeItem("refresh_token")
        ]);

    // 로그아웃 후에 모달 닫기
    setIsLogoutModalVisible(false);
    setIsLogoutPressed(false);

    // 성공 메세지 보이게 만들기
    setIsLogoutSuccessVisible(true);

    // 성공 메세지 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // 성공 메시지 fade-out 후 onboarding 이동
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsLogoutSuccessVisible(false);
        navigation.navigate("OnBoarding");
      });
    }, 3000);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
    setIsLogoutPressed(false);
  };

  const handleDeleteAccountPress = () => {
    //TODO 계정 삭제 로직 작성
  };
  // 개발 중 상태 함수
  const handleServiceButtonPress = () => {
    setIsServiceModalVisible(true);

    setTimeout(() => {
      setIsServiceModalVisible(false);
    }, 2000);
  };

  if (!profileData) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.pageNameContainer}>
          <Text style={styles.pageName}>프로필 수정</Text>
        </View>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: profileData.profileImgUrl }}
            style={{ width: 138, height: 138, borderRadius: 100, margin: 10 }}
          />
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{profileData.nickname}</Text>
          </View>
        </View>
        <View style={styles.accountAdmin}>
          <Text style={styles.accountAdminText}>계정 관리</Text>
          <TouchableOpacity
            style={[styles.button, isLogoutPressed && styles.buttonPressed]}
            onPress={() => {
              setIsLogoutPressed(true);
              handleLogoutPress();
            }}
            onPressOut={() => setIsLogoutPressed(false)}
          >
            <Text style={styles.buttontext}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              isDeleteAccountPressed && styles.buttonPressed,
            ]}
            onPress={() => {
              setIsDeleteAccountPressed(true);
              handleDeleteAccountPress();
            }}
            onPressOut={() => setIsDeleteAccountPressed(false)}
          >
            <Text style={styles.buttontext}>계정탈퇴</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={isLogoutModalVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>로그아웃 하시겠습니까?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={handleCancelLogout}
                >
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonLogout]}
                  onPress={handleLogoutConfirm}
                >
                  <Text style={styles.modalButtonText}>로그아웃</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.customerService}>
          <Text style={styles.customerServiceText}>고객 서비스</Text>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={handleServiceButtonPress}
            disabled={isServiceModalVisible}
          >
            <Text style={styles.buttontext}>평가 바로가기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceButton}
            onPress={handleServiceButtonPress}
            disabled={isServiceModalVisible}
          >
            <Text style={styles.buttontext}>무코에 문의하기</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={isServiceModalVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>아직 개발 중입니다!</Text>
            </View>
          </View>
        </Modal>
        {isLogoutSuccessVisible && (
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 1)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <Text style={{ color: "black", fontSize: 20 }}>
                성공적으로 로그아웃 되었습니다.
              </Text>
            </Animated.View>
          </Animated.View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  pageNameContainer: {
    height: "10%",
    justifyContent: "center",
  },
  pageName: {
    color: "#ffffff",
    marginLeft: 20,
  },
  profileInfo: {
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
    backgroundColor: "#151414",
  },
  profileNameContainer: {
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10,
    padding: 6,
    paddingHorizontal: 140,
    borderRadius: 100,
  },
  profileName: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
  },
  accountAdmin: {
    width: "100%",
    marginTop: 20,
  },
  accountAdminText: {
    color: "#ffffff",
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonPressed: {
    backgroundColor: "#353535",
  },
  buttontext: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  customerService: {
    width: "100%",
    marginTop: 20,
  },
  customerServiceText: {
    color: "#ffffff",
    marginLeft: 20,
  },
  serviceButton: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  buttontext: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#151515",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    padding: 10,
    marginLeft: 10,
  },
  modalButtonCancel: {
    backgroundColor: "#8A8A8A",
    borderRadius: 5,
  },
  modalButtonLogout: {
    backgroundColor: "#B466C3",
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
