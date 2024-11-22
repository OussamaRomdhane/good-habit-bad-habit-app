import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

import { getSecondaryHabitTypeColor } from "../utils/colors";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Spacings.s4,
  },
  currentDateLabelGood: {
    fontWeight: "bold",
    color: getSecondaryHabitTypeColor("good"),
  },
  currentDateLabelBad: {
    fontWeight: "bold",
    color: getSecondaryHabitTypeColor("bad"),
  },
  streakContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacings.s4,
  },
  streakItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#485460",
  },
});

export { styles };
