import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Language } from 'types/api';
import { LanguageStorage } from 'storage/SessionStorage';
import { fetchLanguages_GET } from 'post/fetchApis';

interface State {
  languages: Language[];
  isLoading: boolean;
}

interface Action {
  fetch: () => Promise<Language[]>;
  setIsLoading: (isLoading: State['isLoading']) => void;
}

const useLanguagesStore = create<State & Action>()(
  devtools(
    (set, get) => ({
      languages: LanguageStorage.get() || [],
      isLoading: false,
      fetch: async () => {
        get().setIsLoading(true);
        const data = await fetchLanguages_GET();

        if (!data) {
          // TODO: 안전한 에러 핸들링 추가
          return [];
        }
        get().setIsLoading(false);

        const { languages: fetchedLanguages } = data;
        LanguageStorage.set(fetchedLanguages);
        set({ languages: LanguageStorage.get() || [] });
        return fetchedLanguages;
      },
      setIsLoading: (isLoading) => set({ isLoading })
    }),
    { name: 'languagesStore' }
  )
);

export default useLanguagesStore;
