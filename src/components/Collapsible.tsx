import React, { PropsWithChildren, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import { AppColors } from "../constants/colors";

import { styles } from "./Collapsible.style";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron-right"
          size={18}
          color={theme === "light" ? AppColors.light.icon : AppColors.dark.icon}
          style={[styles.icon, isOpen ? styles.isOpen : styles.isClose]}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}
