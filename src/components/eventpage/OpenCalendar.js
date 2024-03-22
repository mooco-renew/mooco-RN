import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const OpenCalendar = () => {
  return <View style={styles.EventListContainer}></View>;
};

const styles = StyleSheet.create({
  EventListContainer: {
    borderWidth: 1,
    borderColor: "red",
    width: 30,
    height: 50,
  },
});

export default OpenCalendar;
