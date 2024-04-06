import AsyncStorage from "@react-native-async-storage/async-storage";

// 토글 상태 저장
export const storeToggleState = async (isEnabled) => {
  try {
    await AsyncStorage.setItem("toggleState", JSON.stringify(isEnabled));
  } catch (error) {
    console.error("토글 상태 저장 에러:", error);
  }
};

// 토글 상태 불러오기
export const getToggleState = async () => {
  try {
    const value = await AsyncStorage.getItem("toggleState");
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (error) {
    console.error("토글 상태 불러오기 에러:", error);
    return false;
  }
};
