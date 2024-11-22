import { DEFAULT_SORTING_VALUE } from "../constants/filters";

export const getMainPageSortingFunction = (
  pickedSortingValue: MainPageSortingValue = DEFAULT_SORTING_VALUE
): ((a: CalculatedTrackedHabit, b: CalculatedTrackedHabit) => number) => {
  return (a, b) => {
    switch (pickedSortingValue) {
      case "z-a":
        return a.name < b.name ? 1 : -1;
      case "favorites-first":
        return 0;
      case "favorites-last":
        return 0;
      case "bad-good":
        return a.type === b.type
          ? a.name > b.name
            ? 1
            : -1
          : a.type === "bad"
          ? -1
          : 1;
      case "good-bad":
        return a.type === b.type
          ? a.name > b.name
            ? 1
            : -1
          : a.type === "good"
          ? -1
          : 1;
      case "less-streaks":
        return a.streak === b.streak
          ? a.name > b.name
            ? 1
            : -1
          : a.streak - b.streak;
      case "longest-streaks":
        return a.streak === b.streak
          ? a.name > b.name
            ? 1
            : -1
          : b.streak - a.streak;
      case "a-z":
      default:
        return a.name > b.name ? 1 : -1;
    }
  };
};
