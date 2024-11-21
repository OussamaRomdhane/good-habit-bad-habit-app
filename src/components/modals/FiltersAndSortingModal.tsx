import * as React from "react";
import { Portal } from "react-native-portalize";
import {
  Modal,
  Picker,
  RadioButton,
  RadioGroup,
  Spacings,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import { useAtomValue, useSetAtom } from "jotai";

import { IconSymbol } from "../ui/IconSymbol";
import {
  closeCurrentOpenModalAtom,
  getCurrentOpenModalAtom,
} from "../../state/modals";
import { getFiltersAtom, setFiltersAtom } from "../../state/filters";
import {
  defaultFiltersValue,
  MAIN_PAGE_SORTING_OPTIONS,
} from "../../constants/filters";
import { ThemedText } from "../ThemedText";

import { styles } from "./FiltersAndSortingModal.styles";

export const FiltersAndSortingModal = () => {
  const filters = useAtomValue(getFiltersAtom);
  const currentOpenModal = useAtomValue(getCurrentOpenModalAtom);

  const setFilters = useSetAtom(setFiltersAtom);
  const closeCurrentOpenModal = useSetAtom(closeCurrentOpenModalAtom);

  const resetFiltersAndSorting = () => {
    setFilters({ ...filters, mainPage: defaultFiltersValue.mainPage });
  };

  const {
    sortBy,
    visibleHabitsType,
    shouldShowCustomHabitsOnly,
    shouldShowHabitsWithStreaksOnly,
  } = filters.mainPage;

  if (currentOpenModal !== "habits-filters-and-sorting") {
    return null;
  }

  return (
    <Portal>
      <Modal
        animationType="slide"
        visible={currentOpenModal === "habits-filters-and-sorting"}
        onRequestClose={closeCurrentOpenModal}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text text60 style={styles.headerTitle}>
              Filters and sorting
            </Text>
            <Text
              style={styles.resetFiltersAndSorting}
              onPress={resetFiltersAndSorting}
            >
              Reset
            </Text>
            <IconSymbol
              size={32}
              name="close"
              color="#7f8c8d"
              onPress={closeCurrentOpenModal}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.customHabitsFilterContainer}>
              <Switch
                value={shouldShowCustomHabitsOnly}
                onValueChange={(shouldShowCustomHabitsOnly) =>
                  setFilters({
                    ...filters,
                    mainPage: {
                      ...filters.mainPage,
                      shouldShowCustomHabitsOnly,
                    },
                  })
                }
              />
              <Text>Custom habits only</Text>
            </View>

            <View style={styles.activeStreaksFilterContainer}>
              <Switch
                value={shouldShowHabitsWithStreaksOnly}
                onValueChange={(shouldShowHabitsWithStreaksOnly) =>
                  setFilters({
                    ...filters,
                    mainPage: {
                      ...filters.mainPage,
                      shouldShowHabitsWithStreaksOnly,
                    },
                  })
                }
              />
              <Text>⚡ Active streaks only</Text>
            </View>

            <View style={styles.typeFilterContainer}>
              <RadioGroup
                initialValue={visibleHabitsType}
                onValueChange={(visibleHabitsType: AllHabitTypeValues) =>
                  setFilters({
                    ...filters,
                    mainPage: {
                      ...filters.mainPage,
                      visibleHabitsType,
                    },
                  })
                }
                animated
                style={styles.typeFilterRadioGroup}
              >
                <RadioButton
                  labelStyle={styles.typeFilterRadioLabel}
                  value="all"
                  label="All habits"
                />
                <RadioButton
                  labelStyle={styles.typeFilterRadioLabel}
                  value="good"
                  label="😇 Good habits only"
                />
                <RadioButton
                  labelStyle={styles.typeFilterRadioLabel}
                  value="bad"
                  label="😈 Bad habits only"
                />
              </RadioGroup>
            </View>

            <View style={styles.sortContainer}>
              <ThemedText>Sort:</ThemedText>

              <View style={styles.sortContent}>
                <Picker
                  value={sortBy}
                  placeholder={"Click to pick"}
                  onChange={(newValue) => {
                    setFilters({
                      ...filters,
                      mainPage: {
                        ...filters.mainPage,
                        sortBy: newValue as MainPageSortingValue,
                      },
                    });
                  }}
                  items={MAIN_PAGE_SORTING_OPTIONS}
                  renderInput={(
                    _value?: undefined,
                    label?: string | undefined
                  ) => {
                    return (
                      <TouchableOpacity style={styles.sortPickerItemContainer}>
                        <ThemedText style={styles.sortPickerItemText}>
                          {label || "Click to pick"}
                        </ThemedText>
                        <IconSymbol name="open-in-new" color="#7f8c8d" />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
