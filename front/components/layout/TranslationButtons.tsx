import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const TranslationButtons = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <article>
      <div className="absolute top-0 right-0 flex justify-end gap-4 z-10">
        <button
          onClick={() => changeLanguage('fr')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Français
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          English
        </button>
      </div>
    </article>
  );
};
