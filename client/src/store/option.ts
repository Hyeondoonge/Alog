import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  keyword: string;
}

interface Action {
  setKeyword: (keyword: State['keyword']) => void;
}

const useOptionStore = create<State & Action>()(
  devtools(
    (set) => ({
      keyword: '',
      setKeyword: (keyword) => set({ keyword })
    }),
    { name: 'optionStore' }
  )
);

export default useOptionStore;
