import {atom} from 'jotai';

const currentHighlightedHabitAtom = atom<CalculatedTrackedHabit | undefined>(
  undefined,
);

export const getCurrentHighlightedHabitAtom = atom<
  CalculatedTrackedHabit | undefined
>(get => {
  return get(currentHighlightedHabitAtom);
});

export const setCurrentHighlightedHabitAtom = atom(
  null,
  (_get, set, newHighlightedHabit: CalculatedTrackedHabit | undefined) => {
    set(currentHighlightedHabitAtom, newHighlightedHabit);
  },
);
