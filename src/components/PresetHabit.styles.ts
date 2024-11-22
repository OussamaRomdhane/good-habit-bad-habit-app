import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

import {
  getPrimaryHabitTypeColor,
  getSecondaryHabitTypeColor,
} from "../utils/colors";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacings.s4,
    width: "100%",
    padding: Spacings.s4,
    borderColor: "#7f8c8d",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: Spacings.s4,
  },
  rootDisabled: {
    backgroundColor: "#ecf0f1",
    opacity: 0.7,
    borderColor: "#ecf0f1",
    filter: "grayscale(0.9)",
  },
  habitType: {
    width: 32,
    height: 32,
    marginLeft: "auto",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  habitTypeGoodHabit: {
    backgroundColor: getPrimaryHabitTypeColor("good"),
    borderColor: getSecondaryHabitTypeColor("good"),
  },
  habitTypeBadHabit: {
    backgroundColor: getPrimaryHabitTypeColor("bad"),
    borderColor: getSecondaryHabitTypeColor("bad"),
  },
  badge: {
    paddingTop: Spacings.s1,
    paddingLeft: Spacings.s1,
    position: "absolute",
    top: parseInt(`-${Spacings.s2}`),
    left: -2,
  },
});

export { styles };
