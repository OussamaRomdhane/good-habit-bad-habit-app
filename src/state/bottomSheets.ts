import { atom } from "jotai";

const currentOpenBottomSheetAtom = atom<AppBottomSheet[]>([]);

export const getCurrentOpenBottomSheetAtom = atom<AppBottomSheet | null>(
  (get) => {
    const array = get(currentOpenBottomSheetAtom);
    return array[array.length - 1] ?? null;
  }
);

export const setCurrentOpenBottomSheetAtom = atom(
  null,
  (get, set, newOpenBottomSheet: AppBottomSheet) => {
    const array = get(currentOpenBottomSheetAtom);
    set(currentOpenBottomSheetAtom, [...array, newOpenBottomSheet]);
  }
);

export const closeCurrentOpenBottomSheetAtom = atom(null, (get, set) => {
  const array = get(currentOpenBottomSheetAtom);
  set(currentOpenBottomSheetAtom, [...array.slice(0, array.length - 1)]);
});
