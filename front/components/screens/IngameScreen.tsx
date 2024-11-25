import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { GameDataDisplay } from '../game/Game';
import { useTranslation } from 'react-i18next';

type IngameScreenProps = {
  playerId: PlayerId;
  gameData: GameData;
};

export const IngameScreen = ({ gameData, playerId }: IngameScreenProps) => {
  const { t } = useTranslation();
  const startGame = () => {
    socket.emit('gameStart');
  };

  return (
    <article>
      <h1>{t('screens.inGame.title')}</h1>
      {gameData.turn?.current.choiceCountdown !== null && (
        <div className="absolute top-2 right-2">
          {gameData.turn?.current.choiceCountdown}
        </div>
      )}
      {gameData.state === 'starting' && (
        <article>
          <button onClick={startGame}>{t('screens.inGame.startButton')}</button>
        </article>
      )}
      <GameDataDisplay playerId={playerId} gameData={gameData} />
    </article>
  );
};
