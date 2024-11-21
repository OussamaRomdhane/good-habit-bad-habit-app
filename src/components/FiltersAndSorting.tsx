import React from "react";
import { ScrollView } from "react-native";

import { useAtomValue, useSetAtom } from "jotai";
import { Chip, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { getFiltersAtom, setFiltersAtom } from "../state/filters";
import { setCurrentOpenModalAtom } from "../state/modals";
import { MAIN_PAGE_SORTING_OPTIONS } from "../constants/filters";

import { IconSymbol } from "./ui/IconSymbol";
import { styles } from "./FiltersAndSorting.styles";
import { ThemedText } from "./ThemedText";

const typeFilterChipLabels = {
  good: "😇 only",
  bad: "😈 only",
  all: "All",
} as const;

function MyChip({
  label,
  onPress,
  onDismiss,
}: {
  label: string;
  onPress: () => void;
  onDismiss: () => void;
}) {
  return (
    <Chip
      onDismiss={onDismiss}
      label={label}
      size={36}
      labelStyle={styles.chipLabelStyle}
      containerStyle={styles.chipContainerStyle}
      dismissColor="#7f8c8d"
      onPress={onPress}
    />
  );
}

export function FiltersAndSorting() {
  const filters = useAtomValue(getFiltersAtom);

  const setFilters = useSetAtom(setFiltersAtom);
  const setCurrentOpenModal = useSetAtom(setCurrentOpenModalAtom);

  const {
    sortBy,
    visibleHabitsType,
    shouldShowHabitsWithStreaksOnly,
    shouldShowCustomHabitsOnly,
  } = filters.mainPage;

  return (
    <View style={styles.root}>
      <ScrollView horizontal>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setCurrentOpenModal("habits-filters-and-sorting")}
          >
            <IconSymbol name="list" size={20} color="#7f8c8d" />
            <Text color="#7f8c8d">Filters and sorting</Text>
          </TouchableOpacity>

          {sortBy && (
            <MyChip
              onDismiss={() =>
                setFilters({
                  ...filters,
                  mainPage: {
                    ...filters.mainPage,
                    sortBy: undefined,
                  },
                })
              }
              label={
                MAIN_PAGE_SORTING_OPTIONS.find(({ value }) => value === sortBy)
                  ?.smallLabel ?? ""
              }
              onPress={() => setCurrentOpenModal("habits-filters-and-sorting")}
            />
          )}

          {!sortBy && (
            <TouchableOpacity
              style={styles.stickyChipWithIcon}
              onPress={() => setCurrentOpenModal("habits-filters-and-sorting")}
            >
              <IconSymbol name="sort-by-alpha" color="#7f8c8d" />
              <ThemedText style={styles.chipLabelStyle}>A to Z</ThemedText>
            </TouchableOpacity>
          )}

          {shouldShowCustomHabitsOnly && (
            <MyChip
              onDismiss={() =>
                setFilters({
                  ...filters,
                  mainPage: {
                    ...filters.mainPage,
                    shouldShowCustomHabitsOnly: false,
                  },
                })
              }
              label={"Custom only"}
              onPress={() => setCurrentOpenModal("habits-filters-and-sorting")}
            />
          )}
          {shouldShowHabitsWithStreaksOnly && (
            <MyChip
              onDismiss={() =>
                setFilters({
                  ...filters,
                  mainPage: {
                    ...filters.mainPage,
                    shouldShowHabitsWithStreaksOnly: false,
                  },
                })
              }
              label={"⚡ only"}
              onPress={() => setCurrentOpenModal("habits-filters-and-sorting")}
            />
          )}
          {visibleHabitsType !== "all" && (
            <MyChip
              onDismiss={() =>
                setFilters({
                  ...filters,
                  mainPage: {
                    ...filters.mainPage,
                    visibleHabitsType: "all",
                  },
                })
              }
              label={typeFilterChipLabels[visibleHabitsType]}
              onPress={() => setCurrentOpenModal("habits-filters-and-sorting")}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
