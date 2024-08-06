import ClickbaleTag from 'common/ClickableTag';
import List from '../common/List';
import useLanguagesStore from 'store/languages';
import { useEffect } from 'react';
import useOptionStore, { initIsSelected } from 'store/option';
import { getFilteredLangauges, saveFilteredLangauges } from 'storage/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { OptionQueryString } from 'utils';
import { Language } from 'types/api';
import Skeleton from 'common/Skeleton';

export default function FilterList() {
  const { fetch, languages, isLoading } = useLanguagesStore((state) => ({
    fetch: state.fetch,
    languages: state.languages,
    isLoading: state.isLoading
  }));
  const { isSelected, setIsSelected } = useOptionStore((state) => ({
    isSelected: state.isSelected,
    setIsSelected: state.setIsSelected,
    changeIsSelected: state.changeIsSelected
  }));

  const navigate = useNavigate();

  const handleChangeLanguage = (index: number) => () => {
    const newIsSelected = [...isSelected];
    newIsSelected[index] = !isSelected[index];
    setIsSelected(newIsSelected);
    const selectedLanguages = languages
      .filter((_, index) => newIsSelected[index])
      .map(({ name }) => name);
    saveFilteredLangauges(selectedLanguages);
    setIsSelected(newIsSelected);

    const urlSearchParams = OptionQueryString.createQSUsingSelectedLanguages(selectedLanguages);
    navigate(`/?${urlSearchParams.toString()}`);
  };

  useEffect(() => {
    let fetchedLanguages: Language[];

    function initFilter() {
      if (window.location.pathname !== '/') {
        return;
      }

      const isSelected = initIsSelected(fetchedLanguages);
      setIsSelected(isSelected);
      const { languages: filterParam } = OptionQueryString.getOption();
      if (!filterParam) {
        const filteredLanguages = getFilteredLangauges();
        const urlSearchParams = OptionQueryString.createQSUsingSelectedLanguages(filteredLanguages);
        location.replace(`/?${urlSearchParams.toString()}`);
      }
    }

    (async () => {
      if (languages.length) {
        fetchedLanguages = languages;
      } else {
        fetchedLanguages = await fetch();
      }

      initFilter();
    })();

    window.addEventListener('popstate', initFilter);
    return () => {
      window.removeEventListener('popstate', initFilter);
    };
  }, []);

  return (
    <List>
      {isLoading &&
        new Array(8)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              Component={<div style={{ width: '10rem', height: '4rem', borderRadius: '2rem' }} />}
            />
          ))}
      {languages.map(({ _id: id, name }, index) => (
        <ClickbaleTag
          size={2}
          key={id}
          label={name}
          selected={isSelected[index] || false}
          handleClick={handleChangeLanguage(index)}
        />
      ))}
    </List>
  );
}
