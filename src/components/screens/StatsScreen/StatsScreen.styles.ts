import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

import { getPrimaryHabitTypeColor } from "../../../utils/colors";

const styles = StyleSheet.create({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    margin: Spacings.s4,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Spacings.s6,
    marginBottom: Spacings.s5,
    flexWrap: "wrap",
  },
  startContainer: {
    width: "100%",
    height: 350,
    padding: Spacings.s4,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacings.s6,
  },
  startImage: {
    width: 300,
    height: 200,
  },
  startDescription: {
    fontSize: 26,
    textAlign: "center",
    lineHeight: 42,
  },
  headerImage: {
    color: "#808080",
    bottom: -100,
    left: -45,
    position: "absolute",
  },
  topTextContainer: { width: "75%" },
  topText: {
    fontSize: 20,
    textAlign: "justify",
  },
  chartsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Spacings.s5,
    width: "auto",
  },
  chartsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: Spacings.s10,
  },
  chartsRadioGroup: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Spacings.s2,
  },
  chartsRadioButton: { marginLeft: Spacings.s2 },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: Spacings.s10,
  },
  historyListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Spacings.s6,
  },
  historyGroupContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Spacings.s2,
  },
  historyGroupLabel: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  historyGroupItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacings.s4,
    width: "100%",
  },
  historyGroupItemEmojiContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: "50%",
  },
  historyGroupItemEmojiContainerGood: {
    backgroundColor: getPrimaryHabitTypeColor("good"),
  },
  historyGroupItemEmojiContainerBad: {
    backgroundColor: getPrimaryHabitTypeColor("bad"),
  },
  historyGroupItemTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 0,
    width: "100%",
  },
  historyGroupItemTextHabitName: { padding: 0, margin: 0 },
  historyGroupItemTextHabitPerformedDate: {
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
});

export { styles };
