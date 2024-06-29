import { Language } from 'types/api';
import { safelyCheckPosts } from 'api/helper';
import { IData } from 'hooks/useGetPost';

const { sessionStorage } = window;

export const PostStorage = {
  get: (key: string) => {
    const value = sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    const data = JSON.parse(value);
    // TODO: safelyCheckPosts 공통 함수로 뺄지 여부
    safelyCheckPosts(data);
    return data;
  },
  set: (key: string, value: IData) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

const LanguageStorageKey = 'languages';
export const LanguageStorage = {
  get: () => {
    const value = sessionStorage.getItem(LanguageStorageKey);
    if (!value) {
      return null;
    }
    const data = JSON.parse(value);
    safelyCheckLanguages(data);
    return data;
  },
  set: (value: Language[]) => {
    sessionStorage.setItem(LanguageStorageKey, JSON.stringify(value));
  }
};

function safelyCheckLanguages(param: any): asserts param is Language[] {
  if (!Array.isArray(param)) {
    throw new Error('failed to checking type of languages');
  }
  if (1 <= param.length) {
    const language = param[0];
    if (typeof language._id !== 'string') {
      throw new Error('failed to checking type of id');
    }
    if (typeof language.name !== 'string') {
      throw new Error('failed to checking type of name');
    }
  }
}
