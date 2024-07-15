const KEYWORD_KEY = 'keyword';
const FILTER_KEY = 'filter';

export const OptionQueryString = {
  createQSUsingKeyword: (keyword: string) => {
    const { languages: original_languages } = OptionQueryString.getOption();
    const urlSearchParams = new URLSearchParams();

    if (keyword) {
      urlSearchParams.append(KEYWORD_KEY, keyword);
    }
    urlSearchParams.append(FILTER_KEY, encodeURIComponent(JSON.stringify(original_languages)));

    return urlSearchParams;
  },
  createQSUsingSelectedLanguages: (selectedLanguages: string[]) => {
    const { keyword: original_keyword } = OptionQueryString.getOption();
    const urlSearchParams = new URLSearchParams();

    if (original_keyword) {
      urlSearchParams.append(KEYWORD_KEY, original_keyword);
    }
    urlSearchParams.append(FILTER_KEY, encodeURIComponent(JSON.stringify(selectedLanguages)));

    return urlSearchParams;
  },
  getOption: () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const keywordParam = urlSearchParams.get(KEYWORD_KEY) || '';
    const filterParam: null | string[] = JSON.parse(
      decodeURIComponent(urlSearchParams.get(FILTER_KEY) || 'null')
    );

    return { keyword: keywordParam, languages: filterParam };
  }
};

export function isStringArray(param: any): param is string[] {
  return Array.isArray(param) && param.every((value) => typeof value === 'string');
}
