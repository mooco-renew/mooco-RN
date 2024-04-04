import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity, View, Modal, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LeftArrowSvg from "../../../assets/images/navigation/leftarrow";
import TrashCanSvg from "../../../assets/images/trash/trash";
import deleteDailyBarcode from "../../../server/profile/deleteDailyBarcode";

const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <LeftArrowSvg />
    </TouchableOpacity>
  );
};

const TrashIcon = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { barcodeId } = route.params; // route에서 barcodeId를 가져옴

  const confirmDelete = () => {
    setModalVisible(true);
  };

  const handleDelete = async () => {
    await deleteBarcode(barcodeId); // barcodeId를 deleteBarcode 함수에 전달
    setModalVisible(false);
    navigation.goBack();
  };

  // 휴지통 아이콘을 눌렀을 때 바코드를 삭제하는 함수
  const deleteBarcode = async (barcodeId) => {
    try {
      const response = await deleteDailyBarcode(barcodeId);
      console.log("Deleting Barcode ID:", barcodeId);
      console.log("바코드 삭제됨: ", response.data);
    } catch (error) {
      console.error("바코드 삭제 에러:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={confirmDelete}>
        <TrashCanSvg />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.headerText}>바코드 삭제</Text>
            <Text style={styles.modalText}>
              데일리 바코드를 삭제해도 기록된 {"\n"}게시글은 사라지지 않습니다.
              {"\n"}
              삭제하시겠습니까?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#B466C3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#000",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 18,
    color: "#000",
  },
});

export const trashBtnBar = {
  headerStyle: {
    backgroundColor: "#151515",
    height: 40,
  },
  headerTintColor: "#ffffff",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  headerLeft: () => <CustomBackButton />,
  headerRight: () => <TrashIcon />,
};
