import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacings.s2,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacings.s2,
  },
  mainButton: {
    borderColor: "#7f8c8d",
    borderWidth: 1,
    padding: Spacings.s2,
    gap: Spacings.s2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 40,
  },
  chipLabelStyle: { color: "#7f8c8d", padding: 0 },
  chipContainerStyle: {
    borderColor: "#7f8c8d",
    height: 40,
    padding: Spacings.s2,
  },
  stickyChipWithIcon: {
    borderColor: "#7f8c8d",
    borderWidth: 1,
    borderRadius: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacings.s2,
    padding: Spacings.s3,
    paddingTop: 0,
    paddingBottom: 0,
    height: 40,
  },
});

export { styles };
