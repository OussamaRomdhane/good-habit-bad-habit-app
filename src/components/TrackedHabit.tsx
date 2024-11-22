import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSetAtom } from "jotai";
import { View as NativeView } from "react-native";
import { Badge, Text } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-gesture-handler";

import { IconSymbol } from "./ui/IconSymbol";

import { styles } from "./TrackedHabit.styles";
import { setCurrentOpenBottomSheetAtom } from "../state/bottomSheets";

dayjs.extend(relativeTime);

interface Props {
  habit: CalculatedTrackedHabit;
  onPress: () => void;
}

export function TrackedHabit({ habit, onPress }: Props) {
  const setCurrentOpenBottomSheet = useSetAtom(setCurrentOpenBottomSheetAtom);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        onPress();
        setCurrentOpenBottomSheet("tracked-habit-detail");
      }}
    >
      {habit.lastDid !== undefined && (
        <Badge
          label={dayjs().to(dayjs(habit.lastDid))}
          backgroundColor={"#95a5a6"}
          size={16}
          style={styles.lastDidBadge}
        />
      )}
      <NativeView
        style={[
          styles.cardIcon,
          habit.type === "bad" && styles.cardIconBad,
          habit.type === "good" && styles.cardIconGood,
        ]}
      >
        <Text text30>{habit.emoji}</Text>
      </NativeView>
      <NativeView style={styles.cardDescription}>
        <Text text50 color="#212427">
          {habit.name}
        </Text>
        <Text text80 color="#212427">
          {habit.type === "good" && "Tap to brag!"}
          {habit.type === "bad" && "Tap to confess.."}
        </Text>
      </NativeView>
      <NativeView
        style={[
          styles.cardStreakIcon,
          habit.type === "bad" && styles.cardStreakIconBad,
          habit.type === "good" && styles.cardStreakIconGood,
        ]}
      >
        {habit.streak <= 0 && (
          <IconSymbol
            size={20}
            name="bolt"
            color={"white"}
            style={styles.cardStreakIconNoStreak}
          />
        )}
        {habit.streak > 0 && (
          <>
            <Text text80 color={"white"}>
              {habit.streak}
            </Text>
            <IconSymbol size={20} name="bolt" color={"white"} />
          </>
        )}
      </NativeView>
    </TouchableOpacity>
  );
}
