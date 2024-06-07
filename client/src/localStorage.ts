const Localstorage = window.localStorage;

const FILTER_LANGUAGES_KEY = 'filter_languages';

const saveFilteredLangauges = (languages: string[]) => {
  Localstorage.setItem(FILTER_LANGUAGES_KEY, JSON.stringify(languages));
};

const getFilteredLangauges = () => {
  try {
    const item = Localstorage.getItem(FILTER_LANGUAGES_KEY);

    // TODO: 에러 핸들링 개선
    if (!item) {
      throw new Error('no item');
    }
    const parsed = JSON.parse(item);
    if (!Array.isArray(parsed)) {
      throw new Error('not array');
    }

    return parsed as unknown[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { saveFilteredLangauges, getFilteredLangauges };
