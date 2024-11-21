import { StyleSheet } from "react-native";
import { Spacings } from "react-native-ui-lib";

const styles = StyleSheet.create({
  mainContainer: {
    padding: Spacings.s6,
  },
  headerContainer: {
    flexDirection: "row",
    gap: Spacings.s1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetFiltersAndSorting: {
    borderBlockColor: "black",
    borderWidth: 1,
    padding: Spacings.s2,
    paddingRight: Spacings.s4,
    paddingLeft: Spacings.s4,
    borderColor: "#7f8c8d",
    color: "#7f8c8d",
    gap: Spacings.s2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  headerTitle: { width: "auto", color: "#212427" },
  contentContainer: {
    flexDirection: "column",
    marginTop: Spacings.s10,
    gap: Spacings.s6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  customHabitsFilterContainer: {
    flexDirection: "row",
    gap: Spacings.s2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  activeStreaksFilterContainer: {
    flexDirection: "row",
    gap: Spacings.s1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  typeFilterContainer: {
    flexDirection: "row",
    gap: Spacings.s6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  typeFilterRadioGroup: {
    marginTop: Spacings.s3,
    flexDirection: "column",
    gap: Spacings.s3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  typeFilterRadioLabel: { marginLeft: Spacings.s2 },
  sortContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacings.s2,
  },
  sortContent: {
    display: "flex",
    flexDirection: "row",
    gap: Spacings.s3,
  },
  sortPickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacings.s2,
    padding: Spacings.s4,
    borderColor: "#7f8c8d",
    borderWidth: 1,
    borderRadius: 12,
  },
  sortPickerItemText: { color: "#7f8c8d", padding: 0, margin: 0 },
});

export { styles };
