import React from "react";
import { View } from "react-native-ui-lib";
import { barDataItem } from "react-native-gifted-charts";

import {
  getPrimaryHabitTypeColor,
  getSecondaryHabitTypeColor,
} from "../utils/colors";
import { IconSymbol } from "./ui/IconSymbol";
import { ThemedText } from "./ThemedText";

import { styles } from "./StreakCounter.styles";

type ChartDataItem = barDataItem & { id: string };

interface Props {
  habit: CalculatedTrackedHabit;
  barChartData: ChartDataItem[];
}

function getCurrentDateLabelStyle(habit: CalculatedTrackedHabit) {
  if (habit.type === "good") {
    return styles.currentDateLabelGood;
  }
  if (habit.type === "bad") {
    return styles.currentDateLabelBad;
  }
}

export function StreakCounter({ habit, barChartData }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.streakContainer}>
        {barChartData.map((barChartDataItem, index, array) => {
          const dateLabelStyle =
            index === array.length - 1
              ? getCurrentDateLabelStyle(habit)
              : undefined;
          return (
            <View style={styles.streakItem} key={barChartDataItem.id}>
              <IconSymbol
                size={48}
                color={
                  (habit.type === "good" && barChartDataItem.value > 0) ||
                  (habit.type === "bad" && barChartDataItem.value <= 0)
                    ? getSecondaryHabitTypeColor(habit.type)
                    : getPrimaryHabitTypeColor(habit.type)
                }
                name="bolt"
              />
              <ThemedText style={dateLabelStyle}>
                {barChartDataItem.label}
              </ThemedText>
            </View>
          );
        })}
      </View>
      {barChartData.length !== 0 && (
        <View>
          {habit.type === "good" && (
            <ThemedText style={[styles.centeredText, styles.secondaryText]}>
              A streak for a good habit represents{" "}
              <ThemedText style={[styles.boldText, styles.secondaryText]}>
                the number of days you do that habit
              </ThemedText>
            </ThemedText>
          )}
          {habit.type === "bad" && (
            <ThemedText style={[styles.centeredText, styles.secondaryText]}>
              A streak for a bad habit represents{" "}
              <ThemedText style={[styles.boldText, styles.secondaryText]}>
                the number of days you don't do that habit
              </ThemedText>
            </ThemedText>
          )}
        </View>
      )}
    </View>
  );
}
