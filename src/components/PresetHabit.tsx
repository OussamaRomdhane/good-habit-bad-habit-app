import React from "react";
import {
  Badge,
  Spacings,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

import {
  getPrimaryHabitTypeColor,
  getSecondaryHabitTypeColor,
} from "../utils/colors";

import { styles } from "./PresetHabit.styles";

export const PresetHabit = (props: {
  name: string;
  emoji: string;
  type: HabitType;
  disabled?: boolean;
  onPress: () => void;
}) => {
  const { name, emoji, type, disabled, onPress } = props;

  const habitTypeText = type === "good" ? "😇" : "😈";

  return (
    <TouchableOpacity
      style={[styles.root, disabled && styles.rootDisabled]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text>{emoji}</Text>
      <Text color="#7f8c8d">{name}</Text>
      <View
        style={[
          styles.habitType,
          type === "bad" ? styles.habitTypeBadHabit : styles.habitTypeGoodHabit,
        ]}
      >
        <Text>{habitTypeText}</Text>
      </View>
      {disabled && (
        <Badge
          label="Added"
          backgroundColor={"#95a5a6"}
          size={16}
          style={styles.badge}
        />
      )}
    </TouchableOpacity>
  );
};
