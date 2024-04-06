import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function EventBarcodeTab() {
  return (
    <View style={styles.container}>
      {/* 이벤트 Barcode 정보 렌더링 */}
      <Text style={styles.alertText}>아직 생성된 무드 바코드가 없어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  alertText: {
    color: "#ffffff",
  },
});
