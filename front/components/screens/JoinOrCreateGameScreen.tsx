import { socket } from '@/socket';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const JoinOrCreateGameScreen = () => {
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
    <article className="h-full flex flex-col items-center justify-center gap-20">
      <img src="/images/lsd.svg" alt="" />
      {/* <h1>{t('screens.joinOrCreate.title')}</h1> */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-6 justify-center items-center">
          <label className="text-xl font-semibold">
            {t('screens.joinOrCreate.pseudo')}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-4 px-6 bg-black border-white text-white text-xl font-semibold"
          />
        </div>
        <button
          onClick={createGame}
          className="py-4 px-6 bg-white text-black text-xl font-semibold"
        >
          {t('screens.joinOrCreate.createButton')}
        </button>
        <div className="flex gap-6 justify-center items-center">
          <label className="text-xl font-semibold">
            {t('screens.joinOrCreate.gameId')}
          </label>
          <input
            className="w-full py-4 px-6 bg-black border-white text-white text-xl font-semibold uppercase"
            value={gameId}
            placeholder="ABCDEF"
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
    </article>
  );
};
