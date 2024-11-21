import { StyleSheet } from "react-native";
import { PARALLAX_SCROLL_HEADER_HEIGHT } from "../constants/parallaxScroll";

const styles = StyleSheet.create({
  scrollIndicatorInsets: { bottom: 0 },
  contentContainer: { paddingBottom: 0 },
  container: {
    height: "auto",
    minHeight: "100%",
  },
  header: {
    height: PARALLAX_SCROLL_HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    gap: 16,
    overflow: "hidden",
  },
});

export { styles };
