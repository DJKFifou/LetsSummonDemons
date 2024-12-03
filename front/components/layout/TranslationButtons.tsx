import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const TranslationButtons = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
  };

  return (
    <article>
      <select
        name="translationSelect"
        id="translationSelect"
        className="absolute top-10 right-10 z-10 bg-black text-white text-xl font-semibold"
        onChange={handleSelectChange}
        defaultValue={localStorage.getItem('language') || 'en'}
      >
        <option value="fr">{t('layout.translationButtons.fr')}</option>
        <option value="en">{t('layout.translationButtons.en')}</option>
      </select>
    </article>
  );
};
