import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

const styles = StyleSheet.create({
  root: { flex: 1 },
  headerContainer: {
    flexDirection: "row",
    gap: Spacings.s1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacings.s6,
    paddingBottom: 0,
  },
  headerTitle: { width: "auto", color: "#212427" },
  filtersContainer: {
    flexDirection: "column",
    gap: Spacings.s4,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: Spacings.s6,
    paddingBottom: Spacings.s4,
  },
  filtersContent: {
    flexDirection: "row",
    gap: Spacings.s1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchTextField: { width: 150 },
  searchTextFieldField: {
    borderColor: "#7f8c8d",
    borderBottomWidth: 1,
    paddingBottom: Spacings.s2,
  },
  searchTextFieldPlaceholder: {
    bottom: 0,
  },
  searchTextFieldPlaceholderFloating: {
    bottom: Spacings.s1,
  },
  typeFilterContainer: {
    flexDirection: "row",
    gap: Spacings.s6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  typeRadioGroup: {
    marginTop: Spacings.s3,
    flexDirection: "column",
    gap: Spacings.s3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  typeRadioLabel: { marginLeft: Spacings.s2 },
  customHabitsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: Spacings.s2,
    justifyContent: "center",
    alignItems: "center",
  },
  habitsListContainer: {
    marginBottom: Spacings.s6,
    marginTop: Spacings.s6,
    paddingLeft: Spacings.s2,
    paddingRight: Spacings.s2,
  },
});

export { styles };
