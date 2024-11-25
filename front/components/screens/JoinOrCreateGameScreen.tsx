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
    <article>
      <h1>{t('screens.joinOrCreate.title')}</h1>
      <div>
        <label>{t('screens.joinOrCreate.name')}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <button onClick={createGame}>
          {t('screens.joinOrCreate.createButton')}
        </button>
      </div>
      <div>
        <label>{t('screens.joinOrCreate.gameId')}</label>
        <input
          className="border"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button onClick={joinGame}>
          {t('screens.joinOrCreate.joinButton')}
        </button>
      </div>
    </article>
  );
};
