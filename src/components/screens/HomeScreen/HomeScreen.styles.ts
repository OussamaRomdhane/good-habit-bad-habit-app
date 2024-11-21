import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

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
});

export { styles };
