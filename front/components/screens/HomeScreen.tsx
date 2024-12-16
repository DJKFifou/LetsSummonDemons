import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JoinOrCreateGameScreen } from './JoinOrCreateGameScreen';
import { TranslationButtons } from '@/components/layout/TranslationButtons';
import { SoundButton } from '@/components/layout/SoundButton';
import { Logo } from '@/components/layout/Logo';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const [activeScreen, setActiveScreen] = useState<'home' | 'joinOrCreate'>(
    'home',
  );

  const handleScreenChange = (screen: 'home' | 'joinOrCreate') => {
    setActiveScreen(screen);
  };

  if (activeScreen === 'joinOrCreate') {
    return <JoinOrCreateGameScreen onBack={() => handleScreenChange('home')} />;
  }

  return (
    <article className="h-full flex flex-col items-center justify-center font-benguiatMedium">
      <video
        src="/backgrounds/homeBg.mp4"
        className="absolute w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
      />
      <TranslationButtons />
      <SoundButton />
      <div className="flex flex-col gap-20">
        <Logo home={true} />
        <div className="flex flex-col items-center gap-4">
          <div>
            <button
              onClick={() => handleScreenChange('joinOrCreate')}
              className="relative flex gap-2 justify-center items-center w-[17.5rem] py-4 px-6 text-xl text-shadow"
            >
              <img
                className="absolute w-full h-full object-contain fill-linear-gradient"
                src="/images/cta-border.svg"
                alt=""
              />
              {t('screens.home.playButton')}
              <img src="/images/croix-satan.svg" alt="" />
            </button>
          </div>
          <button className="py-4 px-6 text-xl text-shadow">
            {t('screens.home.rulesButton')}
          </button>
          <button className="text-xl text-shadow">
            {t('screens.home.paramsButton')}
          </button>
        </div>
      </div>
      <button className="absolute bottom-10">
        {t('screens.home.creditsButton')}
      </button>
    </article>
  );
};
