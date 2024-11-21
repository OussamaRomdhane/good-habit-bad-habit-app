import {atom} from 'jotai';

import {defaultFiltersValue} from '../../src/constants/filters';

const filtersAtom = atom<Filters>(defaultFiltersValue);

export const getFiltersAtom = atom<Filters>(get => {
  return get(filtersAtom);
});

export const setFiltersAtom = atom(
  null,
  (_get, set, newFiltersValue: Filters) => {
    set(filtersAtom, {...newFiltersValue});
  },
);
