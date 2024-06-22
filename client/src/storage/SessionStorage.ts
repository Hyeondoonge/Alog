import { Language } from 'types/api';

const { sessionStorage } = window;

export const LanguageStorage = {
  get: (key = 'languages') => {
    const value = sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    const data = JSON.parse(value);
    safelyCheckLanguages(data);
    return data;
  },
  set: (key: string, value: Language[]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
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
