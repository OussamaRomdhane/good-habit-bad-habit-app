import { atom } from "jotai";

import defaultHabits from "../../assets/data/habits.json";

import { getCustomHabitsAtom } from "./customHabits";

export const getAvailableHabitsAtom = atom(async (get) => {
  let customHabits: AvailableHabit[] = [];

  try {
    customHabits = await get(getCustomHabitsAtom);
  } catch (e) {
    console.error(e);
  }

  return [...customHabits, ...(defaultHabits as AvailableHabit[])];
});
