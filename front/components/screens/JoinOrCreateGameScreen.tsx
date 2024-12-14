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
      <img
        className="absolute w-full h-full object-cover -z-10"
        src="/backgrounds/joinOrCreateGameBg.jpg"
        alt="Background"
      />
      <TranslationButtons />
      <SoundButton />
      <Logo />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 flex flex-col items-center gap-10 w-1/2">
        <h3 className="text-center text-2xl font-semibold">
          Rejoignez une session ou lancez votre propre rituel pour invoquer des
          démons.
        </h3>
        <div className="flex gap-6 justify-center items-center">
          <label className="text-xl font-semibold">
            {t('screens.joinOrCreate.pseudo')}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-4 px-6 bg-black border-2 border-white text-white text-xl font-semibold"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-24 mt-96">
        <div className="flex flex-col items-center text-center gap-8">
          <h2 className="text-4.5xl font-semibold">
            REJOINDRE UN RITUEL MAUDIT
          </h2>
          <h5 className="text-xl font-semibold">
            Vous avez reçu un code ? Rejoignez vos amis pour invoquer des forces
            obscures.
          </h5>
          <h5 className="py-4 text-xl font-semibold">
            NOMBRE DE JOUEURS : 2 - 5
          </h5>
          <button
            onClick={createGame}
            className="py-4 px-6 bg-white text-black text-xl font-semibold"
          >
            {t('screens.joinOrCreate.createButton')}
          </button>
        </div>
        <div className="flex flex-col items-center text-center gap-8">
          <h2 className="text-4.5xl font-semibold">
            DEVENIR LE MAÎTRE DU RITUEL
          </h2>
          <h5 className="text-xl font-semibold">
            Choisissez le nombre de joueurs et partagez un code secret pour
            rejoindre le rituel.
          </h5>
          <div className="flex gap-6 justify-center items-center">
            {/* <label className="text-xl font-semibold">
              {t('screens.joinOrCreate.gameId')}
            </label> */}
            <input
              className="w-full py-4 px-6 bg-black border-2 border-white text-white text-xl font-semibold uppercase text-center"
              value={gameId}
              placeholder="XXXXXX"
              onChange={(e) => setGameId(e.target.value)}
            />
          </div>
          <button
            onClick={joinGame}
            className="py-4 px-6 bg-white text-black text-xl font-semibold"
          >
            {t('screens.joinOrCreate.joinButton')}
          </button>
        </div>
      </div>
      <button
        onClick={onBack}
        className="absolute bottom-10 left-10 z-10 text-xl font-semibold"
      >
        {t('layout.backButton.back')}
      </button>
    </article>
  );
};
