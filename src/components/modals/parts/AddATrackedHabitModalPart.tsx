import {
  Button,
  Colors,
  RadioButton,
  RadioGroup,
  Switch,
  Text,
  TextField,
  View,
} from "react-native-ui-lib";
import Fuse from "fuse.js";
import { useAtomValue, useSetAtom } from "jotai/react";
import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { ScrollView } from "react-native";

import { IconSymbol } from "../../ui/IconSymbol";
import { PresetHabit } from "../../PresetHabit";
import { closeCurrentOpenModalAtom } from "../../../state/modals";
import {
  addTrackedHabitAtom,
  getTrackedHabitsAtom,
} from "../../../state/trackedHabits";
import { getAvailableHabitsAtom } from "../../../state/availableHabits";

import { styles } from "./AddATrackedHabitModalPart.styles";

const AddATrackedHabitModalPart = ({
  setCurrentView,
}: {
  setCurrentView: (currentView: AddAHabitModalParts) => void;
}) => {
  const addTrackedHabit = useSetAtom(addTrackedHabitAtom);
  const closeCurrentOpenModal = useSetAtom(closeCurrentOpenModalAtom);

  const trackedHabits = useAtomValue(getTrackedHabitsAtom);
  const availableHabits = useAtomValue(getAvailableHabitsAtom);

  const [habitTypeFilter, setHabitTypeFilter] =
    useState<AllHabitTypeValues>("all");
  const [habitNameSearch, setHabitNameSearch] = useState<string>("");
  const [shouldShowCustomHabitsOnly, setShouldShowCustomHabitsOnly] =
    useState(false);

  const fuse = new Fuse(availableHabits, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    threshold: 0.9,
    keys: ["name"],
  });
  const fuseResults =
    habitNameSearch === ""
      ? availableHabits
      : fuse.search(habitNameSearch).map(({ item }) => item);

  const habits: AvailableHabit[] = fuseResults
    .filter(({ type }) => habitTypeFilter === "all" || type === habitTypeFilter)
    .filter(({ isCustom }) => !shouldShowCustomHabitsOnly || isCustom)
    .map((h) => ({
      ...h,
      type: h.type as "good" | "bad",
      disabled: trackedHabits.some(
        (currentHabit) => currentHabit.name === h.name
      ),
    }));

  if (!habitNameSearch) {
    habits.sort((a, b) => a.name.localeCompare(b.name));
  }

  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    setHabitTypeFilter("all");
    setHabitNameSearch("");
    setShouldShowCustomHabitsOnly(false);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text text60 style={styles.headerTitle}>
          Add a habit
        </Text>
        <IconSymbol
          size={32}
          name="close"
          color="#7f8c8d"
          onPress={() => {
            closeCurrentOpenModal();
          }}
        />
      </View>
      <View style={styles.filtersContainer}>
        <View style={styles.filtersContent}>
          <TextField
            placeholder={"Search"}
            floatingPlaceholder
            onChangeText={(text) => {
              setIsFloating(!!text.length);
              setHabitNameSearch(text);
            }}
            value={habitNameSearch}
            enableErrors
            validateOnChange
            showCharCounter
            maxLength={30}
            style={styles.searchTextField}
            inputMode="text"
            showSoftInputOnFocus
            fieldStyle={styles.searchTextFieldField}
            floatingPlaceholderStyle={{
              ...styles.searchTextFieldPlaceholder,
              ...(isFloating ? styles.searchTextFieldPlaceholderFloating : {}),
            }}
          />
          <Button
            label="Add a custom habit"
            size={Button.sizes.large}
            text80BO
            backgroundColor={Colors.violet30}
            onPress={() => setCurrentView("add-a-custom-habit")}
          />
        </View>

        <View style={styles.typeFilterContainer}>
          <RadioGroup
            initialValue={habitTypeFilter}
            onValueChange={setHabitTypeFilter}
            animated
            style={styles.typeRadioGroup}
          >
            <RadioButton
              labelStyle={styles.typeRadioLabel}
              value="all"
              label="All habits"
            />
            <RadioButton
              labelStyle={styles.typeRadioLabel}
              value="good"
              label="😇 Good habits only"
            />
            <RadioButton
              labelStyle={styles.typeRadioLabel}
              value="bad"
              label="😈 Bad habits only"
            />
          </RadioGroup>
        </View>

        <View style={styles.customHabitsContainer}>
          <Switch
            value={shouldShowCustomHabitsOnly}
            onValueChange={setShouldShowCustomHabitsOnly}
          />
          <Text text80S>Custom habits only</Text>
        </View>
      </View>

      <ScrollView style={styles.habitsListContainer}>
        {habits.map((habit) => (
          <PresetHabit
            key={habit.name}
            name={habit.name}
            emoji={habit.emoji}
            disabled={habit.disabled}
            type={habit.type as "good" | "bad"}
            onPress={() => {
              closeCurrentOpenModal();
              addTrackedHabit({
                ...habit,
                id: uuid.v4(),
                createdAt: Date.now(),
              });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { AddATrackedHabitModalPart };
