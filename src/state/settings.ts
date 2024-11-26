import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultSettings: AppSettings = {
  allowDailyReminders: true,
};

const jsonStorage = createJSONStorage<AppSettings>(() => AsyncStorage);

const settingsAtom = atomWithStorage("settings", defaultSettings, jsonStorage);

export const getSettingsAtom = atom(async (get) => {
  try {
    return await get(settingsAtom);
  } catch (e) {
    console.error(e);
  }
  return defaultSettings;
});

export const setSettingsAtom = atom(
  null,
  async (_, set, newSettings: AppSettings) => {
    try {
      await set(settingsAtom, { ...newSettings });
    } catch (e) {
      console.error(e);
    }
  }
);

export const getUpdateSettingsAtom = <T extends keyof AppSettings>(key: T) =>
  atom(null, async (get, set, newValue: AppSettings[T]) => {
    try {
      const currentSettings = await get(settingsAtom);
      const updatedSettings = { ...currentSettings, [key]: newValue };
      await set(settingsAtom, updatedSettings);
    } catch (e) {
      console.error(e);
    }
  });
