import React from "react";
import { Image, KeyboardAvoidingView } from "react-native";

import { useAtomValue, useSetAtom } from "jotai";
import { Button, Colors, Fader, View } from "react-native-ui-lib";

import ParallaxScrollView from "../../ParallaxScrollView";
import { ThemedView } from "../../ThemedView";
import {
  getCurrentOpenModalAtom,
  setCurrentOpenModalAtom,
} from "../../../state/modals";
import { AddAHabitModal } from "../../modals/AddAHabitModal";
import { getTrackedHabitsAtom } from "../../../state/trackedHabits";
import { FiltersAndSortingModal } from "../../modals/FiltersAndSortingModal";
import { getFiltersAtom } from "../../../state/filters";
import { HabitBottomSheet } from "../../HabitBottomSheet";
import { ThemedText } from "../../ThemedText";
import { TrackedHabit } from "../../TrackedHabit";
import { FiltersAndSorting } from "../../FiltersAndSorting";

import { styles } from "./HomeScreen.styles";
import { getMainPageSortingFunction } from "../../../utils/sorting";
import { getCurrentOpenBottomSheetAtom } from "../../../state/bottomSheets";
import { setCurrentHighlightedHabitAtom } from "../../../state/highlightedHabit";

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
              <TrackedHabit
                key={displayedHabit.id}
                habit={displayedHabit}
                onPress={() => setCurrentHighlightedHabit(displayedHabit)}
              />
            ))}
          </View>

          <View height={150} />

          {currentOpenModal !== null && (
            <>
              <FiltersAndSortingModal />
              <AddAHabitModal />
            </>
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
