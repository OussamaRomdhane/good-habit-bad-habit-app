import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

import {
  getSecondaryHabitTypeColor,
  getPrimaryHabitTypeColor,
} from "../../../utils/colors";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: Spacings.s4,
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacings.s6,
    paddingBottom: 0,
  },
  headerTitle: { width: "auto", color: "#212427" },
  contentContainer: {
    marginTop: Spacings.s6,
    flexDirection: "column",
    gap: Spacings.s8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: Spacings.s6,
    paddingBottom: Spacings.s4,
  },
  nameAndEmojiContainer: {
    flexDirection: "column",
    gap: Spacings.s8,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  emojiChoiceView: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: "50%",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7f8c8d",
    backgroundColor: "transparent",
  },
  emojiChoiceViewGoodHabit: {
    borderColor: getSecondaryHabitTypeColor("good"),
    backgroundColor: getPrimaryHabitTypeColor("good"),
  },
  emojiChoiceViewBadHabit: {
    borderColor: getSecondaryHabitTypeColor("bad"),
    backgroundColor: getPrimaryHabitTypeColor("bad"),
  },
  habitNameField: {
    borderBottomWidth: 1,
    borderColor: "#7f8c8d",
    padding: Spacings.s2,
    width: "100%",
  },
  habitTypeContainer: {
    flexDirection: "column",
    gap: Spacings.s3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  habitTypeRadioGroup: {
    flexDirection: "row",
    gap: Spacings.s5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  habitTypeRadioLabel: { marginLeft: Spacings.s2 },
  actionButtons: {
    marginTop: Spacings.s2,
    flexDirection: "row",
    width: "100%",
    gap: Spacings.s3,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export { styles };
