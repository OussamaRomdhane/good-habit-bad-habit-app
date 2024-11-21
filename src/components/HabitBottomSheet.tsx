import { ScrollView } from "react-native";
import Confetti from "react-native-confetti";
import { Button, Text, Toast, View } from "react-native-ui-lib";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAtomValue, useSetAtom } from "jotai";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import uuid from "react-native-uuid";
import React from "react";
import Dialog from "react-native-dialog";

import { IconSymbol } from "./ui/IconSymbol";
import { ThemedText } from "./ThemedText";
import { StreakCounter } from "./StreakCounter";
import {
  addTrackedHabitActionAtom,
  removeTrackedHabitActionAtom,
} from "../state/trackedHabits";
import { getSecondaryHabitTypeColor } from "../utils/colors";
import {
  closeCurrentOpenBottomSheetAtom,
  getCurrentOpenBottomSheetAtom,
} from "../state/bottomSheets";
import {
  getCurrentHighlightedHabitAtom,
  setCurrentHighlightedHabitAtom,
} from "../state/highlightedHabit";

import { styles } from "./HabitBottomSheet.styles";

type ChartDataItem = barDataItem & { id: string };

const CONFETTI_DURATION = 5000;

dayjs.extend(relativeTime);

function getHistory(habit?: CalculatedTrackedHabit, days: number = 5) {
  if (habit === undefined) {
    return [];
  }

  const sortedActions = [...(habit.actions ?? [])];
  sortedActions.sort((a, b) => b.performedAt - a.performedAt);

  if (sortedActions.length === 0) {
    return [];
  }

  const actionDates = new Array(days).fill(undefined).map((_, index) => {
    return dayjs().subtract(index, "days").format("YYYY-MM-DD");
  });

  return actionDates.map((date) => {
    return {
      date,
      actionsCount: sortedActions.filter(({ performedAt }) => {
        return dayjs(performedAt).format("YYYY-MM-DD") === date;
      }).length,
    };
  });
}

export const HabitBottomSheet = () => {
  const currentOpenBottomSheet = useAtomValue(getCurrentOpenBottomSheetAtom);
  const closeCurrentOpenBottomSheet = useSetAtom(
    closeCurrentOpenBottomSheetAtom
  );

  const habit = useAtomValue(getCurrentHighlightedHabitAtom);

  useEffect(() => {
    const initialData: ChartDataItem[] = getHistory(habit)
      .reverse()
      .map(({ date, actionsCount }, index, arr) => {
        return {
          id: uuid.v4(),
          value: actionsCount,
          label: dayjs(date).format("ddd"),
          frontColor: getSecondaryHabitTypeColor(habit?.type),
          labelTextStyle:
            index === arr.length - 1
              ? {
                  fontWeight: "bold",
                  color: getSecondaryHabitTypeColor(habit?.type),
                }
              : undefined,
        };
      });
    setBarChartData(initialData);
  }, [habit]);

  useEffect(() => {
    setBarChartData((current) => [...current]);
  }, [habit?.type]);

  const [barChartData, setBarChartData] = useState<ChartDataItem[]>([]);

  const barChartMaxValue = Math.max(...barChartData.map(({ value }) => value));

  const explosionRef = useRef<Confetti | null>(null);
  const [shouldShowSuccessToast, setShouldShowSuccessToast] = useState(false);
  const [shouldShowErrorToast, setShouldShowErrorToast] = useState(false);
  const [shouldShowConfirmationDialog, setShouldShowConfirmationDialog] =
    useState(false);
  const [disableDidItButton, setDisableDidItButton] = useState(false);
  const [actionToDelete, setActionToDelete] = useState<
    | {
        actionId: string;
        habitId: string;
      }
    | undefined
  >(undefined);

  const addTrackedHabitAction = useSetAtom(addTrackedHabitActionAtom);
  const removeTrackedHabitAction = useSetAtom(removeTrackedHabitActionAtom);
  const setCurrentHighlightedHabit = useSetAtom(setCurrentHighlightedHabitAtom);

  useEffect(() => {
    if (disableDidItButton) {
      setTimeout(() => {
        setDisableDidItButton(false);
      }, CONFETTI_DURATION - 100);
    }
  }, [disableDidItButton]);

  const actionSheetRef = useRef<Modalize>(null);

  useEffect(() => {
    if (currentOpenBottomSheet === "tracked-habit-detail") {
      actionSheetRef.current?.open();
    }
  }, [currentOpenBottomSheet]);

  useEffect(() => {
    setDisableDidItButton(false);
  }, [habit]);

  return (
    <Portal>
      <Modalize
        modalHeight={500}
        snapPoint={500}
        panGestureEnabled={true}
        panGestureComponentEnabled={false}
        openAnimationConfig={{
          timing: { duration: 1000 },
          spring: { speed: 1, bounciness: 0.1 },
        }}
        onClose={() => setCurrentHighlightedHabit(undefined)}
        ref={actionSheetRef}
        HeaderComponent={
          <View
            style={[
              styles.headerComponent,
              habit?.type === "bad"
                ? styles.headerComponentBadHabit
                : styles.headerComponentGoodHabit,
            ]}
          >
            <Text text60M style={styles.headerComponentLabel}>
              {habit?.emoji}
              {"  "}
              {habit?.name}
            </Text>
            <View
              style={[
                styles.headerComponentStreaks,
                (habit?.streak ?? 0) <= 0 &&
                  styles.headerComponentStreaksHasStreaks,
                habit?.type === "bad"
                  ? styles.headerComponentStreaksBadHabit
                  : styles.headerComponentStreaksGoodHabit,
              ]}
            >
              {(habit?.streak ?? 0) <= 0 && (
                <IconSymbol
                  size={20}
                  name="bolt"
                  color="white"
                  style={styles.headerComponentNoStreakIcon}
                />
              )}
              {(habit?.streak ?? 0) > 0 && (
                <>
                  <Text text80 color="white">
                    {habit?.streak}
                  </Text>
                  <IconSymbol size={20} name="bolt" color="white" />
                </>
              )}
            </View>
          </View>
        }
        onClosed={() => closeCurrentOpenBottomSheet()}
      >
        <ScrollView style={styles.container}>
          <View>
            <Confetti
              confettiCount={25}
              duration={CONFETTI_DURATION}
              ref={(node) => (explosionRef.current = node)}
            />
            {disableDidItButton && (
              <ProgressBar
                styleAttr="Horizontal"
                color={getSecondaryHabitTypeColor(habit?.type)}
                animating
                style={styles.progressBar}
              />
            )}
          </View>
          <View style={styles.contentContainer}>
            {habit && (
              <View>
                <StreakCounter habit={habit} barChartData={barChartData} />
              </View>
            )}
            <Button
              label="I just did this!"
              labelStyle={styles.justDidButtonLabel}
              style={styles.justDidButton}
              backgroundColor={getSecondaryHabitTypeColor(habit?.type)}
              disabled={disableDidItButton}
              disabledBackgroundColor={"#bdc3c7"}
              onPress={() => {
                if (habit?.type === "good") {
                  explosionRef.current?.startConfetti();
                }

                setDisableDidItButton(true);

                if (habit !== undefined) {
                  addTrackedHabitAction(habit.id, {
                    performedAt: Date.now(),
                  });
                }
              }}
            />

            {habit?.lastDid === undefined && (
              <View style={styles.noActionContainer}>
                <ThemedText style={styles.noActionText}>
                  You have not logged any activity yet, history data will be
                  available once you do
                </ThemedText>
              </View>
            )}
            {habit?.lastDid !== undefined && (
              <>
                <View style={styles.lastDidContainer}>
                  <ThemedText style={styles.lastDidTitle}>
                    Last performed
                  </ThemedText>
                  <View style={styles.lastDidValueContainer}>
                    <>
                      <ThemedText style={styles.lastDidRelativeDate}>
                        {habit?.lastDid
                          ? `${dayjs().to(dayjs(habit.lastDid))}`
                          : ""}
                      </ThemedText>

                      <ThemedText style={styles.lastDidAbsoluteDate}>
                        ({new Date(habit?.lastDid).toLocaleString()})
                      </ThemedText>
                    </>
                  </View>
                </View>
                <View style={styles.recentHistoryContainer}>
                  <ThemedText style={styles.recentHistoryLabel}>
                    Recent history
                  </ThemedText>
                  <BarChart
                    isAnimated
                    barWidth={40}
                    noOfSections={
                      barChartMaxValue < 10 ? barChartMaxValue + 1 : 11
                    }
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barChartData}
                    maxValue={barChartMaxValue + 1}
                    focusBarOnPress
                    yAxisThickness={0}
                    xAxisThickness={0}
                    onPress={(pressedItem: ChartDataItem) => {
                      setBarChartData((current) =>
                        current.map((item) => {
                          if (item.id === pressedItem.id) {
                            return {
                              ...item,
                              topLabelComponent: () => (
                                <ThemedText style={styles.barChartTopLabel}>
                                  {pressedItem.value}
                                </ThemedText>
                              ),
                            };
                          }
                          const {
                            topLabelComponent: _,
                            ...itemWithoutTopLabel
                          } = item;
                          return { ...itemWithoutTopLabel };
                        })
                      );
                    }}
                  />
                </View>
                <View style={styles.actionListContainer}>
                  {habit.actions?.map((action) => (
                    <View key={action.id} style={styles.actionContainer}>
                      <ThemedText style={styles.actionAbsoluteDate}>
                        {new Date(action.performedAt).toLocaleString()}
                      </ThemedText>
                      <ThemedText style={styles.actionRelativeDate}>
                        {dayjs().to(dayjs(action.performedAt))}
                      </ThemedText>
                      <IconSymbol
                        style={styles.actionDeleteIcon}
                        color="#e74c3cda"
                        name="delete-forever"
                        size={18}
                        onPress={() => {
                          setShouldShowConfirmationDialog(true);
                          setActionToDelete({
                            actionId: action.id,
                            habitId: habit.id,
                          });
                        }}
                      />
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
        <Toast
          visible={shouldShowSuccessToast}
          position={"bottom"}
          autoDismiss={1000}
          backgroundColor="#27ae60"
          message="Deleted"
          onDismiss={() => {
            setShouldShowSuccessToast(false);
          }}
          onClose={() => {
            setShouldShowSuccessToast(false);
          }}
        />
        <Toast
          visible={shouldShowErrorToast}
          position={"bottom"}
          autoDismiss={2000}
          backgroundColor="#e74c3cda"
          message="Error occurred"
          onDismiss={() => {
            setShouldShowErrorToast(false);
          }}
          onClose={() => {
            setShouldShowErrorToast(false);
          }}
        />
        <Dialog.Container
          visible={shouldShowConfirmationDialog}
          onRequestClose={() => setShouldShowConfirmationDialog(false)}
        >
          <Dialog.Title>Remove history item?</Dialog.Title>
          <Dialog.Description>This cannot be undone</Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => setShouldShowConfirmationDialog(false)}
          />
          <Dialog.Button
            label="Remove"
            onPress={() => {
              if (actionToDelete !== undefined) {
                removeTrackedHabitAction(
                  actionToDelete.habitId,
                  actionToDelete.actionId
                );
                setActionToDelete(undefined);
                setShouldShowSuccessToast(true);
              } else {
                setShouldShowErrorToast(true);
              }
              setShouldShowConfirmationDialog(false);
            }}
          />
        </Dialog.Container>
      </Modalize>
    </Portal>
  );
};
