import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DailyModal from "../../components/dailyModal/DailyModal";
import { CommonActions } from "@react-navigation/native";
import {
  Menu,
  NativeBaseProvider,
  Pressable,
  VStack,
  Center,
} from "native-base";
import postDailyImageData from "../../server/daily/postDailyImageData";

export default function DailyUpload({ route, navigation }) {
  const [comment, setComment] = useState("");
  const [inputHeight, setInputHeight] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [render, setRender] = useState();
  const [cameraPermission, setCameraPermission] = useState(null);
  const dateString = route.params.date;

  const Header = "글 작성 취소하기";
  const Content = "글 작성을 그만두시겠습니까?";
  const Btn1 = "닫기";
  const Btn1Event = () => setIsOpen(false);
  const Btn2 = "취소하기";
  const Btn2Event = () => navigation.pop();

  const uploadPost = async (date, images, memo) => {
    if (selectedImages.length !== 0 || memo !== "") {
      await postDailyImageData(date, images, memo);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" }],
        })
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {}, []);
  const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height); // 높이 동적 업데이트
  };
  function rendering() {
    //useState 값이 바로 변경되지 않기 때문에 렌더링 함수 필요
    setRender([render]);
  }
  const imagePickerOption = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    saveToPhotos: true,
  };
  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");
    if (cameraPermission.status !== "granted") {
      alert("권한을 허용해주세요.");
    }
  };

  // 카메라 촬영
  const handleCameraOpen = async () => {
    permisionFunction();
    let result = await ImagePicker.launchCameraAsync({ imagePickerOption });
    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        selectedImages.push(result.assets[i].uri);
      }
      setSelectedImages(selectedImages);
      rendering();
    }
  };
  const handlePickImage = async () => {
    // 사용자가 이미지를 선택할 수 있도록 갤러리를 엽니다.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // 여러 이미지 선택 허용
      selectionLimit: 4 - selectedImages.length, // 최대 4장 선택 가능
      quality: 1, // 최상의 품질로 이미지 선택
    });
    if (!result.canceled) {
      // 선택 취소되지 않았다면 선택된 이미지들의 리스트를 업데이트합니다.
      for (let i = 0; i < result.assets.length; i++) {
        selectedImages.push(result.assets[i].uri);
      }
      setSelectedImages(selectedImages);
      rendering();
    }
  };

  const handleCancel = () => {
    console.log("취소");
    setMenuVisible(false);
  };

  /*
  //이미지 삭제 기능
  const removeImage = (uri) => {
    setSelectedImages(selectedImages.filter((image) => image.uri !== uri));
  };*/

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < selectedImages.length; i++) {
      if (i < 2) {
        //안드로이드 2*2 그리드 2행의 여백 문제로 인한 분기
        grid.push(
          <Image
            key={`post-${i}`}
            source={{ uri: selectedImages[i] }}
            style={styles.postImage}
            alt="업로드 이미지"
          />
        );
      } else {
        //2행일 경우 상단 여백을 줌
        grid.push(
          <Image
            key={`post-${i}`}
            source={{ uri: selectedImages[i] }}
            style={[styles.postImage, styles.marginTopT]}
            alt="업로드 이미지"
          />
        );
      }
    }
    return grid;
  };

  return (
    <>
      <NativeBaseProvider>
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
          <ScrollView backgroundColor="black">
            <View
              style={
                isOpen
                  ? [styles.alertContiner, styles.alertContinerzIndexOpen]
                  : [styles.alertContiner, styles.alertContinerzIndexClose]
              }
            >
              {isOpen && Platform.OS === "ios" && (
                <Modal visible={isOpen} transparent={true}>
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
                </Modal>
              )}
              {isOpen && Platform.OS === "android" && (
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

            <View style={styles.appBar}>
              <StatusBar />
              <MaterialIcons
                name="navigate-before"
                size={24}
                color="white"
                onPress={() => setIsOpen(true)}
              />
              <Text style={styles.appBarTitle}>데일리 기록</Text>
              {selectedImages.length !== 0 || comment !== "" ? (
                <Ionicons
                  name="send"
                  size={24}
                  color="white"
                  onPress={() => {
                    setIsLoading(true);
                    uploadPost(dateString, selectedImages, comment);
                  }}
                />
              ) : (
                <Ionicons name="send" size={24} color="grey" />
              )}
            </View>
            <View style={styles.container}>
              <VStack space={3}>
                <TextInput
                  style={[styles.input, { height: Math.max(100, inputHeight) }]}
                  multiline
                  value={comment}
                  onContentSizeChange={handleContentSizeChange}
                  onChangeText={setComment}
                  placeholderTextColor="grey"
                  placeholder="오늘 당신의 일상에 대해 간단한 코멘트를 남겨보세요. 오늘의 일상은 오늘만 기록할 수 있어요."
                  cursorColor="white"
                />
                <View style={styles.imageContainer}>
                  {selectedImages && renderGrid()}
                  {
                    //사진 4장을 다 선택 했다면 추가 버튼 안뜸
                    selectedImages.length !== 4 && (
                      <>
                        <TouchableOpacity
                          style={
                            selectedImages.length >= 2
                              ? [styles.uploadButton, styles.marginTopT]
                              : styles.uploadButton
                          }
                          onPress={() => setMenuVisible(true)}
                        >
                          <Center>
                            <Menu
                              isOpen={menuVisible}
                              onClose={() => setMenuVisible(false)}
                              trigger={(triggerProps) => {
                                return (
                                  <Pressable {...triggerProps}>
                                    <Ionicons
                                      name="add"
                                      size={24}
                                      color="white"
                                    />
                                  </Pressable>
                                );
                              }}
                            >
                              <Menu.Item onPress={handlePickImage}>
                                앨범에서 고르기
                              </Menu.Item>
                              <Menu.Item onPress={handleCameraOpen}>
                                카메라 열기
                              </Menu.Item>
                              <Menu.Item onPress={handleCancel}>취소</Menu.Item>
                            </Menu>
                          </Center>
                        </TouchableOpacity>
                      </>
                    )
                  }
                  {
                    //그리드 모양 유지를 위한 빈 뷰
                    selectedImages.length % 2 === 0 && (
                      <View style={[styles.voidImage, styles.marginTopT]} />
                    )
                  }
                </View>
              </VStack>
            </View>
          </ScrollView>
        </SafeAreaView>
      </NativeBaseProvider>
    </>
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
    zIndex: 99,
  },
  alertContinerzIndexClose: {
    zIndex: -1,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#151515",
  },
  appBarTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
    textAlignVertical: "top",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-around",
    aspectRatio: 1,
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 8,
  },
  postImage: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  voidImage: {
    width: "48%",
    aspectRatio: 1,
  },
  marginTopT: {
    marginTop: "2%",
  },
});
