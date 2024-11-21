import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    fontWeight: "bold",
  },
  isOpen: {
    transform: [{ rotate: "90deg" }],
  },
  isClose: {
    transform: [{ rotate: "0deg" }],
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});

export { styles };
