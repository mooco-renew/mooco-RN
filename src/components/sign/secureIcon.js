import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function SecureIcon({isSecure, setIsSecure}) {
  return (
    <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)} // 상태 변경
          style={styles.icon}
        >
          <MaterialIcons name={isSecure ? 'visibility-off' : 'visibility'} size={20} color="#000000" />
        </TouchableOpacity>
  )
}
// 스타일 정의
const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 3,
      padding: 14,
    },
  });
