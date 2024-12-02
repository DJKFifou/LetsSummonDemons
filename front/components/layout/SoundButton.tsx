import { useTranslation } from 'react-i18next';

export const SoundButton = () => {
  const { t } = useTranslation();

  return (
    <article>
      <div className="absolute bottom-10 right-10 z-10 flex gap-2 text-xl font-semibold">
        <input type="checkbox" id="soundButton" />
        <label htmlFor="soundButton">{t('layout.soundButton.sound')}</label>
      </div>
    </article>
  );
};
