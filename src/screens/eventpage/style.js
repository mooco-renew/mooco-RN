import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    top: 60,
  },

  nameContainer: {},
  contentText: {
    // top: 50,
    left: 30,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
    paddingBottom: 3,
    width: "80%",
    left: 30,

    marginBottom: 50,
  },
  input: {
    fontSize: 16,
    color: "#000000",
    // paddingTop: 5,
  },

  friendContainer: {
    marginBottom: 20,
    overflow: "hidden",
  },

  image: {
    width: 30,
    height: 30,
    // top: 20,
    left: 30,
  },

  confirmContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBox: {
    backgroundColor: "#151515",
    width: "83%",
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmText: { color: "white" },
});
