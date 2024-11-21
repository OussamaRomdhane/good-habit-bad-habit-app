/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { AppColors } from "../constants/colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof AppColors.light & keyof typeof AppColors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return AppColors[theme][colorName];
  }
}
