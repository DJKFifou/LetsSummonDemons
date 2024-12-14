import { useTranslation } from 'react-i18next';

export const BackButton = () => {
  const { t } = useTranslation();

  return (
    <article>
      <button className="absolute bottom-10 left-10 z-10 text-xl font-benguiatMedium">
        {t('layout.backButton.back')}
      </button>
    </article>
  );
};
