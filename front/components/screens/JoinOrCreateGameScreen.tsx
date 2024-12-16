import { socket } from '@/socket';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TranslationButtons } from '@/components/layout/TranslationButtons';
import { SoundButton } from '@/components/layout/SoundButton';
import { Logo } from '@/components/layout/Logo';

interface JoinOrCreateGameScreenProps {
  onBack: () => void;
}

export const JoinOrCreateGameScreen = ({
  onBack,
}: JoinOrCreateGameScreenProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState('Bob');
  const [gameId, setGameId] = useState('');

  const createGame = () => {
    socket.emit('gameCreate', { playerInputData: { name } });
  };

  const joinGame = () => {
    socket.emit('gameJoin', { gameId, playerInputData: { name } });
  };

  return (
    <article className="container mx-auto h-full flex flex-col items-center">
      <video
        src="/backgrounds/homeBg.mp4"
        className="absolute w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
      />
      <TranslationButtons />
      <SoundButton />
      <Logo />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-24 w-max">
        <div className="relative w-[28rem] h-[27rem] flex justify-center items-center">
          <div>
            <img
              className="absolute top-0 left-0 -z-10"
              src="/images/card-bg.png"
              alt=""
            />
            <img
              className="absolute top-7 left-5 -z-10 w-[90%]"
              src="/images/card-border.svg"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center text-center gap-8">
            <h2 className="text-3.5xl font-benguiatBold">
              REJOINDRE UN RITUEL
            </h2>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label className="font-benguiatBold" htmlFor="pseudo">
                {t('screens.joinOrCreate.pseudo')}
              </label>
              <div className="relative">
                <input
                  id="pseudo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="XXXXXX"
                  className="absolute left-0 w-full h-full bg-transparent text-red placeholder:text-red font-benguiatMedium uppercase text-center"
                />
                <img src="/images/cta-bg.png" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[20%] w-60 h-12 text-xl font-benguiatMedium">
            <img
              className="absolute top-0 left-0.5 -z-10 w-[98%]"
              src="/images/cta-bg-game.jpg"
              alt=""
            />
            <img
              className="absolute -top-0.5 left-0 -z-10"
              src="/images/cta-border-game.svg"
              alt=""
            />
            <button onClick={createGame} className="w-full h-full">
              {t('screens.joinOrCreate.createButton')}
            </button>
          </div>
        </div>
        <div className="relative w-[28rem] h-[27rem] flex justify-center items-center">
          <div>
            <img
              className="absolute top-0 left-0 -z-10"
              src="/images/card-bg.png"
              alt=""
            />
            <img
              className="absolute top-7 left-5 -z-10 w-[90%]"
              src="/images/card-border.svg"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center text-center gap-8">
            <h2 className="text-3.5xl font-benguiatBold">CRÉER UN RITUEL</h2>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label className="font-benguiatBold" htmlFor="pseudo">
                {t('screens.joinOrCreate.pseudo')}
              </label>
              <div className="relative">
                <input
                  id="pseudo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="XXXXXX"
                  className="absolute left-0 w-full h-full bg-transparent text-red placeholder:text-red font-benguiatMedium uppercase text-center"
                />
                <img src="/images/cta-bg.png" alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label className="font-benguiatBold" htmlFor="code">
                Vous avez reçu un code ?
              </label>
              <div className="relative">
                <input
                  id="code"
                  className="absolute left-0 w-full h-full bg-transparent text-red placeholder:text-red font-benguiatMedium uppercase text-center"
                  value={gameId}
                  placeholder="XXXXXX"
                  onChange={(e) => setGameId(e.target.value)}
                />
                <img src="/images/cta-bg.png" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[20%] w-60 h-12 text-xl font-benguiatMedium">
            <img
              className="absolute top-0 left-0.5 -z-10 w-[98%]"
              src="/images/cta-bg-game.jpg"
              alt=""
            />
            <img
              className="absolute -top-0.5 left-0 -z-10"
              src="/images/cta-border-game.svg"
              alt=""
            />
            <button onClick={joinGame} className="w-full h-full">
              {t('screens.joinOrCreate.joinButton')}
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={onBack}
        className="absolute bottom-10 left-10 z-10 flex gap-2 justify-center items-center font-benguiatMedium cursor-pointer"
      >
        <div className="relative w-12 h-12 flex justify-center items-center *:absolute">
          <img src="/images/back-arrow.svg" alt="" />
          <img src="/images/circle-border.svg" alt="" />
        </div>
        {t('layout.backButton.back')}
      </button>
    </article>
  );
};
