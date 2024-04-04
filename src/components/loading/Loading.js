import React from 'react'
import {  View, Modal, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { Center } from "native-base";

export default function Loading() {
  return (
    <View
    style={[styles.alertContiner, styles.alertContinerzIndexOpen]}>
    {Platform.OS === "ios" && (
      <Modal visible={true} transparent={true}>
        <Center>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </Center>
      </Modal>
    )}
    {Platform.OS === "android" && (
      <Center>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </Center>
    )}
  </View>
  )
}

const styles = StyleSheet.create({
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alertContinerzIndexOpen: {
      zIndex: 99,
    },
    alertContinerzIndexClose: {
      zIndex: -1,
    },
  });
  