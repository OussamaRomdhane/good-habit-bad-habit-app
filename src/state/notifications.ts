import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const jsonStorage = createJSONStorage<
  Partial<Record<ScheduledNotification, string>>
>(() => AsyncStorage);

const scheduledNotificationsAtom = atomWithStorage(
  "scheduledNotifications",
  {},
  jsonStorage
);

export const getScheduledNotificationsAtom = atom(async (get) => {
  try {
    const current = await get(scheduledNotificationsAtom);
    return current;
  } catch (e) {
    console.error(e);
  }
  return {};
});

export const addOrUpdateScheduledNotificationAtom = atom(
  null,
  async (get, set, key: ScheduledNotification, id: string) => {
    try {
      const current = await get(scheduledNotificationsAtom);
      set(scheduledNotificationsAtom, { ...current, [key]: id });
    } catch (e) {
      console.error(e);
    }
  }
);

export const addScheduledNotificationIfNotExistAtom = atom(
  null,
  async (get, set, key: ScheduledNotification, id: string) => {
    try {
      const current = await get(scheduledNotificationsAtom);
      set(scheduledNotificationsAtom, { ...current, [key]: id });
    } catch (e) {
      console.error(e);
    }
  }
);

export const removeScheduledNotificationAtom = atom(
  null,
  async (get, set, key: ScheduledNotification) => {
    try {
      const current = await get(scheduledNotificationsAtom);
      const updated = { ...current };
      delete updated[key];
      set(scheduledNotificationsAtom, updated);
    } catch (e) {
      console.error(e);
    }
  }
);
