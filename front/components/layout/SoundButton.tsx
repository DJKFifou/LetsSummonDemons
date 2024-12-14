import { useTranslation } from 'react-i18next';

export const SoundButton = () => {
  const { t } = useTranslation();

  return (
    <article>
      <div className="absolute bottom-10 right-10 z-10 flex gap-2 justify-center items-center font-benguiatMedium cursor-pointer">
        <input type="checkbox" id="soundButton" />
        <div className="relative w-12 h-12 flex justify-center items-center *:absolute">
          <img src="/images/sound.svg" alt="" />
          <img src="/images/sound-border.svg" alt="" />
        </div>
        <label htmlFor="soundButton">{t('layout.soundButton.sound')}</label>
      </div>
    </article>
  );
};
