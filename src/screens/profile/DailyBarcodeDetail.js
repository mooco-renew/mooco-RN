import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Switch,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import patchPublicBarcode from "../../server/profile/patchPublicBarcode";
import {
  storeToggleState,
  getToggleState,
} from "../../util/toggle/ToggleUtils";
import CheckSvg from "../../assets/images/check/check";

// 전역 상태 관리 CONTEXT API
import { useBarcodeContext } from "../../context/BarcodeContext";
import getMyDailyDetailPhoto from "../../server/profile/getMyDailyDetailPhoto";

export default function DailyBarcodeDetail() {
  // 1. 토글 상태를 관리하기 위한 상태 변수 설정
  const [isEnabled, setIsEnabled] = useState(false);

  // 2. 모달 창 열기 여부를 관리하기 위한 상태 변수 설정
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 3. 사진 데이터 받아오는 변수
  const [photos, setPhotos] = useState([]);

  // 4. 무한 로딩 상태
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const route = useRoute();
  const {
    profileImgUrl,
    nickname,
    barcodeUrl,
    month,
    year,
    barcodeId,
    isPrivate,
  } = route.params;
  const { setBarcodeId } = useBarcodeContext();

  useEffect(() => {
    setBarcodeId(barcodeId);
  }, [barcodeId, setBarcodeId]);

  useEffect(() => {
    getToggleStateFromStorage(); // 저장된 토글 상태 불러오기
  }, []);

  useEffect(() => {
    setIsEnabled(isPrivate); // 초기 토글 상태 설정
  }, [isPrivate]);

  useEffect(() => {
    loadPhotos(); // 사진 정보 받아오기
  }, []);

  const getToggleStateFromStorage = async () => {
    const storedToggleState = await getToggleState();
    setIsEnabled(storedToggleState);
  };

  const toggleSwitch = async () => {
    console.log("barcodeId:", barcodeId);
    console.log("isEnabled:", isEnabled);
    setIsEnabled((previousState) => !previousState);
    setModalMessage(
      !isEnabled
        ? "게시글이 비공개 처리되었습니다."
        : "게시글이 공개 처리되었습니다."
    );
    setModalVisible(true);

    try {
      await patchPublicBarcode(barcodeId, !isEnabled);
      storeToggleState(!isEnabled); // 토글 상태 저장
    } catch (error) {
      console.error("바코드 전환 에러:", error);
    }
  };

  // 추가된 부분
  const loadPhotos = async () => {
    try {
      const response = await getMyDailyDetailPhoto(year, month);
      console.log(response.data);
      if (response.success) {
        const imageList = response.data.dayBarcodePhotoDtoList;
        setPhotos(imageList); // 이미지 리스트 전체를 설정
      } else {
        console.error("일상 디테일 사진 조회 에러 ", response.error.message);
      }
    } catch (error) {
      console.error("일상 디테일 사진 조회 에러 ", error);
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImgUrl }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{nickname}님의</Text>
          <Text style={styles.profileYear}>{month}월 모아보기</Text>
        </View>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return renderHeader();
    } else {
      return (
        <TouchableOpacity
          style={[styles.imageContainer, { width: 160, height: 160 }]}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.detailImage} />
        </TouchableOpacity>
      );
    }
  };

  const loadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const response = await getMyDailyDetailPhoto(year, month, nextPage);
      if (response.success) {
        const newPhotos = response.data.dayBarcodePhotoDtoList;
        const nextTenPhotos = newPhotos.slice(0, 10);
        setPhotos((prevPhotos) => [...prevPhotos, ...nextTenPhotos]);
        setCurrentPage(nextPage);
      } else {
        console.error("일상 디테일 사진 조회 에러 ", response.error.message);
      }
    } catch (error) {
      console.error("일상 디테일 사진 조회 에러 ", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const LoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  return (
    <View style={styles.headContainer}>
      <TouchableOpacity
        onPress={() => {
          toggleSwitch();
          setModalVisible(true);
        }}
        style={styles.switchContainer}
      >
        <View style={styles.customSwitch}>
          <Switch
            trackColor={{ false: "#767577", true: "#B466C3" }}
            thumbColor={isEnabled ? "#B466C3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.detailTitleText}>Daily Barcode</Text>
        <Image source={{ uri: barcodeUrl }} style={styles.barcodeImage} />
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>다운로드</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.flatListContainer}
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item, index) => `photo-${index}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          numColumns={2}
          ListFooterComponent={isLoadingMore && <LoadingIndicator />}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CheckSvg />
              <Text style={styles.modalText}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  headContainer: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#000000",
  },

  switchContainer: {
    justifyContent: "flex-end",
    marginRight: 16,
  },
  customSwitch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },

  detailTitleText: {
    fontSize: 60,
    textAlign: "center",
    color: "#ffffff",
  },
  barcodeImage: {
    width: 320,
    height: 140,
    resizeMode: "cover",
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "center",
  },

  profileContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: 34,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
    marginBottom: 10,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  profileYear: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
  },
  detailImage: {
    width: 160,
    height: 160,
    borderRadius: 20,
  },
  flatListContainer: {
    marginTop: 20,
  },

  downloadButton: {
    position: "relative",
    alignSelf: "flex-end",
    bottom: 0,
    right: 0,
    width: 90,
    height: 38,
    backgroundColor: "#2A2929",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginRight: 20,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 20,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -25,
  },
});
