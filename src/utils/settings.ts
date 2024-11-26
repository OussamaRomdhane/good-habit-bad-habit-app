import * as Linking from "expo-linking";
import { Platform } from "react-native";

export const openAppSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else if (Platform.OS === "android") {
    Linking.openSettings();
  } else {
    console.error("Unsupported platform");
  }
};
