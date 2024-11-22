import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

import {
  getPrimaryHabitTypeColor,
  getSecondaryHabitTypeColor,
} from "../utils/colors";

const styles = StyleSheet.create({
  container: { marginBottom: Spacings.s10 },
  justDidButtonLabel: { fontWeight: "bold" },
  justDidButton: { margin: Spacings.s4 },
  noActionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s1,
  },
  noActionText: {
    fontSize: 20,
    textAlign: "center",
    color: "#2f3640",
  },
  lastDidContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s2,
  },
  lastDidValueContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s1,
    width: "100%",
    marginLeft: Spacings.s4,
  },
  lastDidTitle: { fontSize: 24 },
  lastDidRelativeDate: { fontSize: 18 },
  lastDidAbsoluteDate: { fontSize: 14, color: "#485460" },
  recentHistoryContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s2,
    marginTop: Spacings.s6,
  },
  recentHistoryLabel: { fontSize: 24 },
  headerComponent: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerComponentGoodHabit: {
    backgroundColor: getPrimaryHabitTypeColor("good"),
    borderBottomColor: getSecondaryHabitTypeColor("good"),
  },
  headerComponentBadHabit: {
    backgroundColor: getPrimaryHabitTypeColor("bad"),
    borderBottomColor: getSecondaryHabitTypeColor("bad"),
  },
  headerComponentLabel: { marginLeft: Spacings.s2 },
  headerComponentStreaks: {
    width: "auto",
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: Spacings.s2,
    paddingLeft: Spacings.s4,
    borderTopLeftRadius: "50%",
  },
  headerComponentStreaksGoodHabit: {
    backgroundColor: getSecondaryHabitTypeColor("good"),
  },
  headerComponentStreaksBadHabit: {
    backgroundColor: getSecondaryHabitTypeColor("bad"),
  },
  headerComponentStreaksHasStreaks: {
    paddingLeft: Spacings.s6,
  },
  headerComponentNoStreakIcon: { opacity: 0.3 },
  contentContainer: {
    padding: 6,
    margin: 6,
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s2,
  },
  barChartTopLabel: { textAlign: "center" },
  actionListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s4,
    marginTop: Spacings.s6,
    marginBottom: Spacings.s6,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacings.s4,
  },
  actionAbsoluteDate: { marginRight: "auto", fontSize: 12 },
  actionRelativeDate: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 12,
  },
  actionDeleteIcon: { marginLeft: "auto" },
  progressBar: { width: "100%", height: 20, marginTop: 0, paddingTop: 0 },
});

export { styles };
