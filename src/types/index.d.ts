/**
 * Filter types
 */

type MainPageSortingValue =
  | "a-z"
  | "z-a"
  | "longest-streaks"
  | "less-streaks"
  | "favorites-first"
  | "favorites-last"
  | "good-bad"
  | "bad-good";

type MainPageFilters = {
  sortBy?: MainPageSortingValue;
  visibleHabitsType: AllHabitTypeValues;
  shouldShowCustomHabitsOnly: boolean;
  shouldShowHabitsWithStreaksOnly: boolean;
};

type Filters = { mainPage: MainPageFilters };

/**
 * Habit types
 */

type HabitType = "good" | "bad";
type AllHabitTypeValues = "all" | "good" | "bad";

type HabitAction = {
  // uuid
  id: string;
  // JS Timestamp
  performedAt: number;
};

type AvailableHabit = {
  name: string;
  emoji: string;
  type: HabitType;
  disabled?: boolean;
  isCustom?: boolean;
};

type TrackedHabit = AvailableHabit & {
  id: string;
  createdAt: number;
  actions?: HabitAction[];
};

type CalculatedTrackedHabit = TrackedHabit & {
  // Number of actions that happen in a row
  streak: number;
  // JS Timestamp (last item in actions)
  lastDid?: number;
};

type TrackedHabitActionHistory = {
  // YYYY-MM-DD
  date: string;
  actionsCount: number;
};

/**
 * Modals
 */

type AppModal = "habit" | "add-a-habit" | "habits-filters-and-sorting";
type AddAHabitModalParts = "main" | "add-a-custom-habit";

/**
 * Bottom sheets
 */

type AppBottomSheet = "tracked-habit-detail";

/**
 * Pages
 */

type AppPage = "home" | "stats" | "settings";
