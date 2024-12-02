import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JoinOrCreateGameScreen } from './JoinOrCreateGameScreen';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const [activeScreen, setActiveScreen] = useState<'home' | 'joinOrCreate'>(
    'home',
  );

  if (activeScreen === 'joinOrCreate') {
    return <JoinOrCreateGameScreen />;
  }

  return (
    <article className="relative h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-20">
        <img src="/images/lsd.svg" alt="" />
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setActiveScreen('joinOrCreate')}
            className="w-96 py-4 px-6 bg-white text-black text-xl font-semibold"
          >
            {t('screens.home.playButton')}
          </button>
          <button className="w-96 py-4 px-6 border-white text-xl font-semibold">
            {t('screens.home.rulesButton')}
          </button>
          <button className="w-96 py-4 px-6 text-xl font-semibold">
            {t('screens.home.paramsButton')}
          </button>
        </div>
      </div>
      <button className="absolute bottom-16 w-96 py-4 px-6 text-xl font-semibold">
        {t('screens.home.creditsButton')}
      </button>
    </article>
  );
};
