import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacings.s4,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  deleteAllDataButton: { marginTop: Spacings.s6, marginBottom: Spacings.s6 },
  container: {
    paddingBottom: Spacings.s10,
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s4,
  },
  notificationText: {
    borderWidth: 2,
    borderColor: "#2980b9",
    color: "#2980b9",
    padding: Spacings.s4,
    marginBottom: Spacings.s2,
  },
  deleteDataText: { fontSize: 14 },
});

export { styles };
