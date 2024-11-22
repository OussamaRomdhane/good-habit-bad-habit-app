import React, { useEffect, useState } from "react";
import {
  BarChart,
  PieChart,
  pieDataItem,
  popnPyramidDataItem,
  PopulationPyramid,
  stackDataItem,
} from "react-native-gifted-charts";
import { Image } from "react-native";
import { RadioButton, RadioGroup, View } from "react-native-ui-lib";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import uuid from "react-native-uuid";

import { getTrackedHabitsAtom } from "../../../state/trackedHabits";
import { getSecondaryHabitTypeColor } from "../../../utils/colors";
import ParallaxScrollView from "../../ParallaxScrollView";
import { IconSymbol } from "../../ui/IconSymbol";
import { ThemedText } from "../../ThemedText";

import { styles } from "./StatsScreen.styles";

type ChartDataItem = stackDataItem & { id: string };
type GroupedActions = {
  label: string;
  actions: {
    habitType: HabitType;
    habitName: string;
    habitEmoji: string;
    id: string;
    performedAt: number;
  }[];
};

function getHistory(habits: CalculatedTrackedHabit[], days: number = 5) {
  const sortedActions = habits.flatMap((habit) => [
    ...(habit.actions ?? []).map((action) => ({
      ...action,
      habitType: habit.type,
      habitName: habit.name,
      habitEmoji: habit.emoji,
    })),
  ]);
  sortedActions.sort((a, b) => b.performedAt - a.performedAt);

  if (sortedActions.length === 0) {
    return [];
  }

  const actionDates = new Array(days).fill(undefined).map((_, index) => {
    return dayjs().subtract(index, "days").format("YYYY-MM-DD");
  });

  const historyData = actionDates.map((date) => {
    return {
      date,
      goodHabitActionsCount: sortedActions.filter(
        ({ performedAt, habitType }) => {
          return (
            dayjs(performedAt).format("YYYY-MM-DD") === date &&
            habitType === "good"
          );
        }
      ).length,
      badHabitActionsCount: sortedActions.filter(
        ({ performedAt, habitType }) => {
          return (
            dayjs(performedAt).format("YYYY-MM-DD") === date &&
            habitType === "bad"
          );
        }
      ).length,
    };
  });

  return [historyData, sortedActions] as const;
}

export function StatsScreen() {
  const habits = useAtomValue(getTrackedHabitsAtom);

  const [visibleChart, setVisibleChart] = useState("bar-chart");
  const [barChartData, setBarChartData] = useState<ChartDataItem[]>([]);
  const [pieData, setPieData] = useState<pieDataItem[]>([]);
  const [pyramidData, setPyramidData] = useState<popnPyramidDataItem[]>([]);
  const [groupedSortedActions, setGroupedSortedActions] = useState<
    GroupedActions[]
  >([]);

  useEffect(() => {
    const [history = [], sortedActions = []] = getHistory(habits);

    const barChartData = history
      .reverse()
      .map(
        ({ date, goodHabitActionsCount, badHabitActionsCount }, index, arr) => {
          return {
            id: uuid.v4(),
            stacks: [
              {
                value: goodHabitActionsCount,
                color: getSecondaryHabitTypeColor("good"),
              },
              {
                value: badHabitActionsCount,
                color: getSecondaryHabitTypeColor("bad"),
              },
            ],

            label: dayjs(date).format("dd"),
            labelTextStyle:
              index === arr.length - 1
                ? {
                    fontWeight: "bold",
                  }
                : undefined,
          };
        }
      );
    setBarChartData(barChartData);

    let goodHabitActions = 0;
    let badHabitActions = 0;

    history.forEach(({ goodHabitActionsCount, badHabitActionsCount }) => {
      goodHabitActions += goodHabitActionsCount;
      badHabitActions += badHabitActionsCount;
    });

    const pieData = [
      {
        value: goodHabitActions,
        color: getSecondaryHabitTypeColor("good"),
        text: `${goodHabitActions}`,
      },
      {
        value: badHabitActions,
        color: getSecondaryHabitTypeColor("bad"),
        text: `${badHabitActions}`,
      },
    ];

    setPieData(pieData);

    const pyramidData = history.map((historyItem) => {
      return {
        left: historyItem.badHabitActionsCount,
        right: historyItem.goodHabitActionsCount,
        leftBarLabel: `${historyItem.badHabitActionsCount || ""}`,
        leftBarColor: getSecondaryHabitTypeColor("bad"),
        rightBarColor: getSecondaryHabitTypeColor("good"),
        rightBarLabel: `${historyItem.goodHabitActionsCount || ""}`,
        midAxisLabel: dayjs(historyItem.date).format("dd"),
      };
    });

    setPyramidData(pyramidData);

    setGroupedSortedActions(
      sortedActions.reduce<GroupedActions[]>((acc, action) => {
        const index = acc.findIndex(
          ({ label }) => label === dayjs(action.performedAt).format("dddd")
        );

        if (index === -1) {
          acc.push({
            label: dayjs(action.performedAt).format("dddd"),
            actions: [action],
          });
        } else {
          acc[index].actions.push(action);
        }

        return acc;
      }, [])
    );
  }, [habits]);

  const barChartMaxValue = Math.max(
    ...barChartData.flatMap(({ stacks }) => stacks.map(({ value }) => value))
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={300}
          color="#808080"
          name="multiline-chart"
          style={styles.headerImage}
        />
      }
    >
      {habits.length <= 0 && (
        <View style={styles.startContainer}>
          <Image
            style={styles.startImage}
            source={require("../../../../assets/images/stats.png")}
          />
          <ThemedText style={styles.startDescription}>
            Start tracking your habits to see statistics
          </ThemedText>
        </View>
      )}
      {habits.length > 0 && groupedSortedActions.length <= 0 && (
        <View style={styles.startContainer}>
          <Image
            style={styles.startImage}
            source={require("../../../../assets/images/sleeping.png")}
          />
          <ThemedText style={styles.startDescription}>
            No activity found for the past 5 days
          </ThemedText>
        </View>
      )}
      {habits.length > 0 && groupedSortedActions.length > 0 && (
        <View style={styles.container}>
          <ThemedText style={styles.topText}>
            Here are the stats for your activity in the past 5 days, it shows
            the number of performed good habits vs bad habits.
          </ThemedText>
          <View>
            <PieChart showText textColor="white" radius={150} data={pieData} />
          </View>

          <View style={styles.chartsContainer}>
            <ThemedText style={styles.chartsTitle}>Charts</ThemedText>
            <RadioGroup
              initialValue={visibleChart}
              onValueChange={(
                visibleChart: "all | bar-chart" | "pyramid-chart"
              ) => setVisibleChart(visibleChart)}
              animated
              style={styles.chartsRadioGroup}
            >
              <RadioButton
                value="bar-chart"
                label="📊 Bar chart"
                style={styles.chartsRadioButton}
              />
              <RadioButton
                value="pyramid-chart"
                label="🔺 Pyramid chart"
                style={styles.chartsRadioButton}
              />
              <RadioButton
                value="all"
                label="Both"
                style={styles.chartsRadioButton}
              />
            </RadioGroup>
            {(visibleChart === "all" || visibleChart === "bar-chart") && (
              <BarChart
                isAnimated
                barWidth={35}
                noOfSections={barChartMaxValue < 10 ? barChartMaxValue + 1 : 11}
                frontColor="lightgray"
                stackData={barChartData}
                maxValue={barChartMaxValue + 1}
                focusBarOnPress
                yAxisThickness={0}
                xAxisThickness={0}
              />
            )}
            {(visibleChart === "all" || visibleChart === "pyramid-chart") && (
              <PopulationPyramid
                data={pyramidData}
                showMidAxis
                showYAxisIndices={false}
                showXAxisIndices={false}
                showXAxisLabelTexts={false}
                width={275}
                yAxisThickness={0}
                xAxisThickness={0}
                midAxisLabelWidth={50}
              />
            )}
          </View>
          <View>
            <ThemedText style={styles.historyTitle}>History</ThemedText>
            <View style={styles.historyListContainer}>
              {groupedSortedActions.map((group) => {
                return (
                  <View key={group.label} style={styles.historyGroupContainer}>
                    <ThemedText style={styles.historyGroupLabel}>
                      {group.label}
                    </ThemedText>
                    {group.actions.map((action) => {
                      return (
                        <View
                          key={action.id}
                          style={styles.historyGroupItemContainer}
                        >
                          <View
                            style={[
                              styles.historyGroupItemEmojiContainer,
                              action.habitType === "bad"
                                ? styles.historyGroupItemEmojiContainerBad
                                : styles.historyGroupItemEmojiContainerGood,
                            ]}
                          >
                            <ThemedText>{action.habitEmoji}</ThemedText>
                          </View>
                          <View style={styles.historyGroupItemTextContainer}>
                            <ThemedText
                              style={styles.historyGroupItemTextHabitName}
                            >
                              {action.habitName}
                            </ThemedText>
                            <ThemedText
                              style={
                                styles.historyGroupItemTextHabitPerformedDate
                              }
                            >
                              {new Date(
                                action.performedAt
                              ).toLocaleTimeString()}
                            </ThemedText>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </ParallaxScrollView>
  );
}
