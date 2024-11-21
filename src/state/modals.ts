import {atom} from 'jotai';

const currentOpenModalAtom = atom<AppModal[]>([]);

export const getCurrentOpenModalAtom = atom<AppModal | null>(get => {
  const array = get(currentOpenModalAtom);
  return array[array.length - 1] ?? null;
});

export const setCurrentOpenModalAtom = atom(
  null,
  (get, set, newOpenModal: AppModal) => {
    const array = get(currentOpenModalAtom);
    set(currentOpenModalAtom, [...array, newOpenModal]);
  },
);

export const closeCurrentOpenModalAtom = atom(null, (get, set) => {
  const array = get(currentOpenModalAtom);
  set(currentOpenModalAtom, [...array.slice(0, array.length - 1)]);
});
