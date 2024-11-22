import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Animated } from "react-native";
import {
  RectButton,
  Swipeable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useAtomValue, useSetAtom } from "jotai";
import { Button, Colors, Fader, Toast, View } from "react-native-ui-lib";
import Dialog from "react-native-dialog";

import ParallaxScrollView from "../../ParallaxScrollView";
import { ThemedView } from "../../ThemedView";
import {
  getCurrentOpenModalAtom,
  setCurrentOpenModalAtom,
} from "../../../state/modals";
import { AddAHabitModal } from "../../modals/AddAHabitModal";
import {
  getTrackedHabitsAtom,
  removeTrackedHabitAtom,
} from "../../../state/trackedHabits";
import { FiltersAndSortingModal } from "../../modals/FiltersAndSortingModal";
import { getFiltersAtom } from "../../../state/filters";
import { HabitBottomSheet } from "../../HabitBottomSheet";
import { ThemedText } from "../../ThemedText";
import { TrackedHabit } from "../../TrackedHabit";
import { FiltersAndSorting } from "../../FiltersAndSorting";
import { getMainPageSortingFunction } from "../../../utils/sorting";
import { getCurrentOpenBottomSheetAtom } from "../../../state/bottomSheets";
import { setCurrentHighlightedHabitAtom } from "../../../state/highlightedHabit";
import { IconSymbol } from "../../ui/IconSymbol";
import { getSecondaryHabitTypeColor } from "../../../utils/colors";

import { styles } from "./HomeScreen.styles";

const getRenderTrackedHabitLeftActions =
  (args: { onDeleteButtonPressed: () => void }) =>
  (
    _progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [1, 0, 0, -50],
    });
    return (
      <RectButton style={styles.trackedHabitLeftActionsContainer}>
        <Animated.View
          style={[
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.trackedHabitLeftActionsDeleteButton}
            onPress={args.onDeleteButtonPressed}
          >
            <IconSymbol
              name="delete"
              color="white"
              size={64}
              style={styles.trackedHabitLeftActionsDeleteButtonIcon}
            />
            <ThemedText style={styles.trackedHabitLeftActionsDeleteButtonText}>
              Delete
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </RectButton>
    );
  };

export function HomeScreen() {
  const filters = useAtomValue(getFiltersAtom);
  const trackedHabits = useAtomValue(getTrackedHabitsAtom);
  const currentOpenModal = useAtomValue(getCurrentOpenModalAtom);
  const currentOpenBottomSheet = useAtomValue(getCurrentOpenBottomSheetAtom);

  const setCurrentOpenModal = useSetAtom(setCurrentOpenModalAtom);
  const setCurrentHighlightedHabit = useSetAtom(setCurrentHighlightedHabitAtom);

  const {
    sortBy,
    visibleHabitsType,
    shouldShowHabitsWithStreaksOnly,
    shouldShowCustomHabitsOnly,
  } = filters.mainPage;

  const displayedHabits = trackedHabits
    .filter(
      (trackedHabit) =>
        visibleHabitsType === "all" || trackedHabit.type === visibleHabitsType
    )
    .filter(
      (trackedHabit) =>
        !shouldShowHabitsWithStreaksOnly || trackedHabit.streak > 0
    )
    .filter(
      (trackedHabit) => !shouldShowCustomHabitsOnly || trackedHabit.isCustom
    );

  displayedHabits.sort(getMainPageSortingFunction(sortBy));

  const [shouldShowErrorToast, setShouldShowErrorToast] = useState(false);
  const [habitIdToDelete, setHabitIdToDelete] = useState<string | undefined>(
    undefined
  );

  const removeTrackedHabit = useSetAtom(removeTrackedHabitAtom);

  const shouldDeletionShowConfirmationDialog = habitIdToDelete !== undefined;

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("../../../../assets/images/mountain.jpg")}
            style={styles.headerPicture}
          />
        }
      >
        <KeyboardAvoidingView
          behavior="height"
          style={styles.keyboardAvoidingView}
        >
          {trackedHabits.length > 0 && (
            <>
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>Hey There!</ThemedText>
                <ThemedText style={styles.subTitle}>
                  Let's check your progress with your habits
                </ThemedText>
              </ThemedView>

              <FiltersAndSorting />
            </>
          )}
          {trackedHabits.length <= 0 && (
            <View style={styles.startContainer}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>Welcome!</ThemedText>
                <ThemedText style={styles.subTitle}>
                  Start by adding habits to track
                </ThemedText>
              </ThemedView>
              <Image
                source={require("../../../../assets/images/start.png")}
                style={styles.startPicture}
              />
            </View>
          )}

          <View style={styles.cardList}>
            {displayedHabits.map((displayedHabit) => (
              <Swipeable
                key={displayedHabit.id}
                renderRightActions={getRenderTrackedHabitLeftActions({
                  onDeleteButtonPressed: () => {
                    setHabitIdToDelete(displayedHabit.id);
                  },
                })}
                containerStyle={styles.trackedHabitSwipeableContainer}
              >
                <TrackedHabit
                  habit={displayedHabit}
                  onPress={() => setCurrentHighlightedHabit(displayedHabit)}
                />
              </Swipeable>
            ))}
          </View>

          <View height={150} />

          {currentOpenModal !== null && (
            <>
              <FiltersAndSortingModal />
              <AddAHabitModal />
            </>
          )}
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
          {habitIdToDelete !== undefined && (
            <Dialog.Container
              visible
              onRequestClose={() => setHabitIdToDelete(undefined)}
            >
              <Dialog.Title>Remove history item?</Dialog.Title>
              <Dialog.Description>This cannot be undone</Dialog.Description>
              <Dialog.Button
                label="Cancel"
                onPress={() => setHabitIdToDelete(undefined)}
              />
              <Dialog.Button
                label="Remove"
                onPress={() => {
                  if (habitIdToDelete !== undefined) {
                    removeTrackedHabit(habitIdToDelete);
                  } else {
                    setShouldShowErrorToast(true);
                  }
                  setHabitIdToDelete(undefined);
                }}
              />
            </Dialog.Container>
          )}
          <HabitBottomSheet />
        </KeyboardAvoidingView>
      </ParallaxScrollView>
      {currentOpenBottomSheet === null && (
        <Fader visible position={Fader.position.BOTTOM} size={100} />
      )}
      {currentOpenBottomSheet === null && (
        <Button
          style={styles.addAHabitButton}
          label="Add a habit"
          size={Button.sizes.large}
          text70BO
          backgroundColor={Colors.violet30}
          onPress={() => setCurrentOpenModal("add-a-habit")}
          children={null}
        />
      )}
    </>
  );
}
