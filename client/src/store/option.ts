import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getFilteredLangauges } from 'storage/LocalStorage';
import useLanguagesStore from './languages';
import { isStringArray, OptionQueryString } from 'utils';
import { Language } from 'types/api';

interface State {
  keyword: string;
  isSelected: boolean[];
}

interface Action {
  setKeyword: (keyword: State['keyword']) => void;
  setIsSelected: (keyword: State['isSelected']) => void;
  changeIsSelected: (index: number) => void;
}

export const initIsSelected = (languages: Language[]) => {
  if (languages.length === 0) {
    return [];
  }
  const { languages: filterParam } = OptionQueryString.getOption();

  let filteredLanguages: string[] = [];
  if (!filterParam) {
    filteredLanguages = getFilteredLangauges();
  } else if (isStringArray(filterParam)) {
    filteredLanguages = filterParam;
  }

  if (filteredLanguages.length === 0) {
    return new Array(languages.length).fill(false);
  }
  return languages.map(({ name }) => filteredLanguages.includes(name));
};

const useOptionStore = create<State & Action>()(
  devtools(
    (set, get) => ({
      keyword: '',
      isSelected: initIsSelected(useLanguagesStore.getState().languages),
      setKeyword: (keyword) => set({ keyword }),
      setIsSelected: (isSelected) => set({ isSelected }),
      changeIsSelected: (index: number) => {
        const newIsSelected = [...get().isSelected];
        newIsSelected[index] = !get().isSelected[index];
        set({ isSelected: newIsSelected });
      }
    }),
    { name: 'optionStore' }
  )
);

export default useOptionStore;
