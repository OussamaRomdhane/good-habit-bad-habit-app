import { atom } from "jotai";
import uuid from "react-native-uuid";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

import {
  getCurrentHighlightedHabitAtom,
  setCurrentHighlightedHabitAtom,
} from "./highlightedHabit";

const jsonStorage = createJSONStorage<TrackedHabit[]>(() => AsyncStorage);

const trackedHabitsAtom = atomWithStorage("trackedHabits", [], jsonStorage);

dayjs.extend(isBetween);

function convertTrackedHabitToCalculatedTrackedHabit(
  trackedHabit: TrackedHabit
): CalculatedTrackedHabit {
  return {
    ...trackedHabit,
    isCustom: Boolean(trackedHabit.isCustom),
    streak: calculateMostRecentStreak(trackedHabit),
    lastDid: trackedHabit.actions?.length
      ? trackedHabit.actions[trackedHabit.actions.length - 1].performedAt
      : undefined,
  };
}

function refreshCalculatedTrackedHabit(
  calculatedTrackedHabit: CalculatedTrackedHabit
): CalculatedTrackedHabit {
  return {
    ...calculatedTrackedHabit,
    streak: calculateMostRecentStreak(calculatedTrackedHabit),
    lastDid: calculatedTrackedHabit.actions?.length
      ? calculatedTrackedHabit.actions[
          calculatedTrackedHabit.actions.length - 1
        ].performedAt
      : undefined,
  };
}

function getUniqueActionDates(actions: HabitAction[]) {
  const sortedActions = [...actions];
  sortedActions.sort((a, b) => b.performedAt - a.performedAt);

  const actionDates = sortedActions.reduce<string[]>((acc, { performedAt }) => {
    const current = dayjs(performedAt).format("YYYY-MM-DD");
    if (!acc.includes(current)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return actionDates;
}

function calculateMostRecentStreak(trackedHabit: TrackedHabit) {
  if (trackedHabit.type === "bad") {
    return calculateMostRecentStreakForBadHabits(trackedHabit);
  }
  if (trackedHabit.type === "good") {
    return calculateMostRecentStreakForGoodHabits(trackedHabit);
  }
  return 0;
}

function calculateMostRecentStreakForBadHabits(trackedHabit: TrackedHabit) {
  const actionDates = getUniqueActionDates(trackedHabit.actions ?? []);

  if (actionDates.length === 0) {
    return Math.max(dayjs(trackedHabit.createdAt).diff(dayjs(), "day"), 1);
  }

  return Math.max(dayjs(actionDates[0]).diff(dayjs(), "day"));
}

function calculateMostRecentStreakForGoodHabits(trackedHabit: TrackedHabit) {
  let result = 0;

  const actionDates = getUniqueActionDates(trackedHabit.actions ?? []);

  const markedDates: string[] = [];

  if (
    actionDates[0] !== dayjs().format("YYYY-MM-DD") &&
    actionDates[0] !== dayjs().subtract(1, "day").format("YYYY-MM-DD")
  ) {
    return result;
  }

  for (let i = 0; i < actionDates.length; i++) {
    if (markedDates.length === 0) {
      markedDates.push(actionDates[i]);
      result++;
      continue;
    }
    if (
      dayjs(actionDates[i]).diff(
        dayjs(markedDates[markedDates.length - 1]),
        "day"
      ) > 1
    ) {
      return result;
    }
    result++;
  }

  return result;
}

export const getTrackedHabitsAtom = atom(
  async (get): Promise<CalculatedTrackedHabit[]> => {
    try {
      const trackedHabits = await get(trackedHabitsAtom);
      // TODO: update this to use real logic
      return trackedHabits.map(convertTrackedHabitToCalculatedTrackedHabit);
    } catch (e) {
      console.error(e);
    }

    return [];
  }
);

export const addTrackedHabitAtom = atom(
  null,
  async (get, set, newHabit: TrackedHabit) => {
    try {
      const current = await get(trackedHabitsAtom);
      set(trackedHabitsAtom, [...current, newHabit]);
    } catch (e) {
      console.error(e);
    }
  }
);

export const clearTrackedHabitsAtom = atom(null, (_, set) => {
  try {
    set(trackedHabitsAtom, []);
  } catch (e) {
    console.error(e);
  }
});

export const addTrackedHabitActionAtom = atom(
  null,
  async (get, set, trackedHabitId: string, action: Omit<HabitAction, "id">) => {
    try {
      const currentTrackedHabits = await get(trackedHabitsAtom);
      const highlightedHabit = await get(getCurrentHighlightedHabitAtom);

      let updatedHabit: TrackedHabit | undefined;

      for (let i = 0; i < currentTrackedHabits.length; i++) {
        if (currentTrackedHabits[i].id === trackedHabitId) {
          const currentActions = currentTrackedHabits[i].actions ?? [];
          currentTrackedHabits[i] = {
            ...currentTrackedHabits[i],
            actions: [...currentActions, { ...action, id: uuid.v4() }],
          };

          updatedHabit = currentTrackedHabits[i];
        }
      }
      set(trackedHabitsAtom, [...currentTrackedHabits]);

      if (
        highlightedHabit?.id === trackedHabitId &&
        updatedHabit !== undefined
      ) {
        set(
          setCurrentHighlightedHabitAtom,
          convertTrackedHabitToCalculatedTrackedHabit(updatedHabit)
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const removeTrackedHabitActionAtom = atom(
  null,
  async (get, set, trackedHabitId: string, actionId: string) => {
    try {
      const current = await get(trackedHabitsAtom);
      const highlightedHabit = await get(getCurrentHighlightedHabitAtom);

      set(
        trackedHabitsAtom,
        current.map((trackedHabit) => {
          if (trackedHabitId === trackedHabit.id) {
            return {
              ...trackedHabit,
              actions:
                trackedHabit.actions === undefined
                  ? undefined
                  : trackedHabit.actions.filter(
                      (action) => action.id !== actionId
                    ),
            };
          }

          return trackedHabit;
        })
      );

      if (highlightedHabit?.id === trackedHabitId) {
        set(
          setCurrentHighlightedHabitAtom,
          refreshCalculatedTrackedHabit({
            ...highlightedHabit,
            actions: highlightedHabit.actions?.filter(
              ({ id }) => id !== actionId
            ),
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const removeTrackedHabitAtom = atom(
  null,
  async (get, set, trackedHabitId: string) => {
    try {
      const current = await get(trackedHabitsAtom);

      set(
        trackedHabitsAtom,
        current.filter(({ id }) => id !== trackedHabitId)
      );
    } catch (e) {
      console.error(e);
    }
  }
);
