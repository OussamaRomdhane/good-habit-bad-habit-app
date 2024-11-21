import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const jsonStorage = createJSONStorage<AvailableHabit[]>(() => AsyncStorage);

const customHabitsAtom = atomWithStorage("customHabits", [], jsonStorage);

export const getCustomHabitsAtom = atom(async (get) => {
  try {
    const current = await get(customHabitsAtom);
    return current.map((elem) => ({ ...elem, isCustom: true }));
  } catch (e) {
    console.error(e);
  }
  return [];
});

export const addCustomHabitAtom = atom(
  null,
  async (get, set, newCustomHabit: AvailableHabit) => {
    try {
      const current = await get(customHabitsAtom);
      set(customHabitsAtom, [
        ...current,
        { ...newCustomHabit, isCustom: true },
      ]);
    } catch (e) {
      console.error(e);
    }
  }
);
