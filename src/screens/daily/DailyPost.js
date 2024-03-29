import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { NativeBaseProvider, HStack, VStack, Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import DailyModal from "../../components/dailyModal/DailyModal";
import getDailyImageData from "../../server/daily/getDailyImageData";
import deleteDailyImageData from "../../server/daily/deleteDailyImageData";
import dailyImageData from "../../data/daily/dailyImageData";
import getDailyImageUserData from "../../server/daily/getDailyImageUserData";
import dailyImageUserData from "../../data/daily/dailyImageUserData";

export default function DailyPost({ route, navigation }) {
  //유저 프로필 정보
  const [userData, setUserData] = useState(dailyImageUserData.data);
  const profilePicture = userData.profileImgUrl;
  const nickname = userData.nickname;
  const identifierId = userData.identifierId;
  const [data, setData] = useState(dailyImageData.data);
  const dateString = route.params.date;
  const memo = data.memo;
  const photos = data.photos;
  const visible = data.visible;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const result = await getDailyImageUserData();
      if (result !== null) {
        // 결과가 null이 아닐 때만 상태 업데이트
        setUserData(result);
      } else {
        // result가 null일 때의 처리 로직, 필요한 경우
      }
    };
    getUserData();
    const getData = async (date) => {
      const result = await getDailyImageData(date);
      if (result !== null) {
        // 결과가 null이 아닐 때만 상태 업데이트
        setData(result);
      } else {
        // result가 null일 때의 처리 로직, 필요한 경우
      }
    };
    getData(dateString);
  }, []);

  const deletePost = async (date) => {
    await deleteDailyImageData(date);
    setIsLoading(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [lockIsOpen, setLockIsOpen] = React.useState(false);
  const Header = "게시글 삭제";
  const Content =
    "삭제시 게시글을 다시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?";
  const Btn1 = "닫기";
  const Btn1Event = () => setIsOpen(false);
  const Btn2 = "삭제하기";
  const Btn2Event = () => {
    console.log("삭제하기");
    if (photos.length !== null) {
      setIsLoading(true);
      deletePost(dateString);
      setIsOpen(false);
    }
  };

  const LockHeader = "일상 사진 열람";
  const LockContent = "아직 이번 달의 사진을 볼 수 없습니다.";
  const LockBtn1Event = () => setLockIsOpen(false);
  const renderGrid = () => {
    if (photos) {
      const grid = [];
      for (let i = 0; i < photos.length; i++) {
        if (i < 2) {
          //안드로이드 2*2 그리드 2행의 여백 문제로 인한 분기
          grid.push(
            <Image
              key={`post-${i}`}
              source={{ uri: photos[i] }}
              style={styles.postImage}
              alt="업로드 이미지"
            />
          );
        } else {
          //2행일 경우 상단 여백을 줌
          grid.push(
            <Image
              key={`post-${i}`}
              source={{ uri: photos[i] }}
              style={[styles.postImage, styles.marginTopT]}
              alt="업로드 이미지"
            />
          );
        }
      }
      if (photos.length % 2) {
        //그리드 모양 유지를 위한 빈 뷰
        grid.push(
          <View
            key={`empty-${photos.length - 1}`}
            style={
              photos.length == 2
                ? [styles.voidImage, styles.marginTopT]
                : styles.voidImage
            }
          />
        );
      }
      return grid;
    }
  };

  const renderLockedGrid = () => {
    if (photos) {
      const grid = [];
      for (let i = 0; i < photos.length; i++) {
        if (i < 2) {
          //안드로이드 2*2 그리드 2행의 여백 문제로 인한 분기
          grid.push(
            <View style={styles.lockContainer}>
              <Image
                key={`post-${i}`}
                source={{ uri: photos[i] }}
                style={styles.lockPostImage}
                alt="업로드 이미지"
              />
              <View style={styles.overlay}>
                <MaterialIcons name="lock-outline" size={24} color="white" />
              </View>
            </View>
          );
        } else {
          //2행일 경우 상단 여백을 줌
          grid.push(
            <View style={[styles.lockContainer, styles.marginTopT]}>
              <Image
                key={`post-${i}`}
                source={{ uri: photos[i] }}
                style={[styles.lockPostImage]}
                alt="업로드 이미지"
              />
              <View style={styles.overlay}>
                <MaterialIcons name="lock-outline" size={24} color="white" />
              </View>
            </View>
          );
        }
      }
      if (photos.length % 2) {
        //그리드 모양 유지를 위한 빈 뷰
        grid.push(
          <View
            key={`empty-${photos.length - 1}`}
            style={
              photos.length == 2
                ? [styles.voidImage, styles.marginTopT]
                : styles.voidImage
            }
          />
        );
      }
      return grid;
    }
  };
  return (
    <NativeBaseProvider>
      <View style={styles.appBar}>
        <StatusBar />
        <MaterialIcons
          name="navigate-before"
          size={24}
          color="white"
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.dateText}>{dateString}</Text>
        {photos.length !== 0 ? (
          <MaterialIcons
            name="delete-forever"
            size={24}
            color="white"
            onPress={() => setIsOpen(true)}
          />
        ) : (
          <MaterialIcons name="delete-forever" size={24} color="grey" />
        )}
      </View>
      <SafeAreaView style={styles.safeContainer}>
        <View
          style={
            isLoading
              ? [styles.alertContiner, styles.alertContinerzIndexOpen]
              : [styles.alertContiner, styles.alertContinerzIndexClose]
          }
        >
          {isLoading && Platform.OS === "ios" && (
            <Modal visible={isLoading} transparent={true}>
              <Center>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </Center>
            </Modal>
          )}
          {isLoading && Platform.OS === "android" && (
            <Center>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </Center>
          )}
        </View>
        <View
          style={
            isOpen
              ? [styles.alertContiner, styles.alertContinerzIndexOpen]
              : [styles.alertContiner, styles.alertContinerzIndexClose]
          }
        >
          {lockIsOpen && Platform.OS === "ios" && (
            <Modal visible={lockIsOpen} transparent={true}>
              <DailyModal
                isOpen={lockIsOpen}
                onClose={LockBtn1Event}
                Header={LockHeader}
                Content={LockContent}
                Btn1={Btn1}
                Btn1Event={LockBtn1Event}
              />
            </Modal>
          )}
          {lockIsOpen && Platform.OS === "android" && (
            <DailyModal
              isOpen={lockIsOpen}
              onClose={LockBtn1Event}
              Header={LockHeader}
              Content={LockContent}
              Btn1={Btn1}
              Btn1Event={LockBtn1Event}
            />
          )}
          {isOpen && (
            <DailyModal
              isOpen={isOpen}
              onClose={Btn1Event}
              Header={Header}
              Content={Content}
              Btn1={Btn1}
              Btn1Event={Btn1Event}
              Btn2={Btn2}
              Btn2Event={Btn2Event}
            />
          )}
        </View>
        <ScrollView style={styles.container}>
          <VStack space={3} flex="1">
            <View style={styles.profileContainer}>
              <HStack space={3} justifyContent="center">
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profilePicture}
                  alt="업로드 이미지"
                />
                <VStack space={1} justifyContent="center">
                  <Text style={styles.username}>{nickname}</Text>
                  <Text style={styles.userId}>{identifierId}</Text>
                </VStack>
              </HStack>
            </View>
            {photos.length !== 0 && visible && (
              <View style={styles.postsContainer}>{renderGrid()}</View>
            )}
            {photos.length !== 0 && !visible && (
              <TouchableOpacity onPress={() => setLockIsOpen(true)}>
                <View style={styles.postsContainer}>{renderLockedGrid()}</View>
              </TouchableOpacity>
            )}
            {photos.length !== 0 && !visible && photos.length > 2 && (
              <TouchableOpacity onPress={() => setLockIsOpen(true)}>
                <View
                  key={`empty-${photos.length - 1}`}
                  style={
                    photos.length == 2
                      ? [styles.voidImage, styles.marginTopT]
                      : styles.voidImage
                  }
                />
              </TouchableOpacity>
            )}
            {photos.length !== 0 && visible && photos.length > 2 && (
              <View
                key={`empty-${photos.length - 1}`}
                style={
                  photos.length == 2
                    ? [styles.voidImage, styles.marginTopT]
                    : styles.voidImage
                }
              />
            )}
            <Text style={styles.userContent}>{memo}</Text>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#151515",
  },
  dateText: {
    color: "white",
    fontSize: 16,
  },
  centerContainer: {
    width: "100%",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "flex-start",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    color: "white",
    fontSize: 14,
  },
  userId: {
    color: "white",
    fontSize: 12,
  },
  postsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    aspectRatio: 2,
    position: "relative",
  },
  lockContainer: {
    position: "relative",
    width: "49%",
    aspectRatio: 1,
  },
  lockPostImage: {
    width: "100%",
    aspectRatio: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#2A2929F7", // 색상 오버레이
    opacity: 0.97, // 불투명도 97%
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    aspectRatio: 1,
  },
  postImage: {
    width: "49%",
    aspectRatio: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  voidImage: {
    width: "49%",
    aspectRatio: 1,
  },
  marginTopT: {
    marginTop: "2%",
  },
  userContent: {
    color: "white",
    alignItems: "flex-start",
    fontSize: 12,
  },
  alertContiner: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContinerzIndexOpen: {
    zIndex: 999,
  },
  alertContinerzIndexClose: {
    zIndex: -1,
  },
});
