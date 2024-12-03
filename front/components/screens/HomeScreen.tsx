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
    <article className="h-full flex flex-col items-center justify-center text-xl font-semibold">
      <TranslationButtons />
      <SoundButton />
      <div className="flex flex-col gap-20">
        <Logo home={true} />
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => handleScreenChange('joinOrCreate')}
            className="w-96 py-4 px-6 bg-white text-black"
          >
            {t('screens.home.playButton')}
          </button>
          <button className="w-96 py-4 px-6 border-2 border-white">
            {t('screens.home.rulesButton')}
          </button>
          <button>{t('screens.home.paramsButton')}</button>
        </div>
      </div>
      <button className="absolute bottom-10">
        {t('screens.home.creditsButton')}
      </button>
    </article>
  );
};
