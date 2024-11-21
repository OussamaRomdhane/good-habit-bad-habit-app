import { PickerItemProps, Typography } from "react-native-ui-lib";

export const defaultFiltersValue: Filters = {
  mainPage: {
    visibleHabitsType: "all",
    shouldShowCustomHabitsOnly: false,
    shouldShowHabitsWithStreaksOnly: false,
  },
};

export const DEFAULT_SORTING_VALUE = "a-z";

export const MAIN_PAGE_SORTING_OPTIONS: (PickerItemProps & {
  value: MainPageSortingValue;
  smallLabel: string;
})[] = [
  {
    label: "Alphabetically (A → Z)",
    smallLabel: "A → Z",
    value: "a-z",
    labelStyle: Typography.text65,
  },
  {
    label: "Alphabetically (Z → A)",
    smallLabel: "Z→A",
    value: "z-a",
    labelStyle: Typography.text65,
  },
  {
    label: "Longest streaks first (Streaks ↑)",
    smallLabel: "Streaks ↑",
    value: "longest-streaks",
    labelStyle: Typography.text65,
  },
  {
    label: "Shortest streaks first (Streaks ↓)",
    smallLabel: "Streaks ↓",
    value: "less-streaks",
    labelStyle: Typography.text65,
  },
  {
    label: "Favorites first (Favorites ↑)",
    smallLabel: "Favorites ↑",
    value: "favorites-first",
    disabled: true,
    labelStyle: Typography.text65,
  },
  {
    label: "Favorites last (Favorites ↓)",
    smallLabel: "Favorites ↓",
    value: "favorites-last",
    disabled: true,
    labelStyle: Typography.text65,
  },
  {
    label: "Good then bad (Good → Bad)",
    smallLabel: "Good → Bad",
    value: "good-bad",
    labelStyle: Typography.text65,
  },
  {
    label: "Bad then good (Bad → Good)",
    smallLabel: "Bad → Good",
    value: "bad-good",
    labelStyle: Typography.text65,
  },
];
