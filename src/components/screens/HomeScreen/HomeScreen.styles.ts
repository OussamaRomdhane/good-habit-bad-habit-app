import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

import { getSecondaryHabitTypeColor } from "../../../utils/colors";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingBottom: Spacings.s4,
  },
  title: {
    paddingTop: Spacings.s8,
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitle: { fontSize: 20, textAlign: "center" },
  headerPicture: {
    height: "100%",
    width: "100%",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s1,
    marginTop: Spacings.s2,
  },
  addAHabitButton: {
    position: "absolute",
    right: Spacings.s4,
    bottom: Spacings.s4,
    padding: Spacings.s1,
    minWidth: 100,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  startContainer: { flex: 1 },
  startPicture: { height: 300, width: "100%" },
  trackedHabitLeftActionsContainer: {
    width: 100,
    backgroundColor: "transparent",
  },
  trackedHabitSwipeableContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "transparent",
  },
  trackedHabitLeftActionsDeleteButton: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  trackedHabitLeftActionsDeleteButtonIcon: {
    borderWidth: 1,
    borderColor: "transparent",
    color: getSecondaryHabitTypeColor("bad"),
  },
  trackedHabitLeftActionsDeleteButtonText: {
    color: getSecondaryHabitTypeColor("bad"),
    fontWeight: "bold",
  },
});

export { styles };
