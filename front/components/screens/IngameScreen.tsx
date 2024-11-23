import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { GameDataDisplay } from '../game/Game';

type IngameScreenProps = {
  playerId: PlayerId;
  gameData: GameData;
};

export const IngameScreen = ({ gameData, playerId }: IngameScreenProps) => {
  const startGame = () => {
    socket.emit('gameStart');
  };

  return (
    <article>
      <h1>En partie</h1>
      {gameData.turn?.current.cardChoiceCountdown !== null && (
        <div className="absolute top-2 right-2">
          {gameData.turn?.current.cardChoiceCountdown}
        </div>
      )}
      {gameData.state === 'starting' && (
        <article>
          <button onClick={startGame}>Démarrer</button>
        </article>
      )}
      <GameDataDisplay playerId={playerId} gameData={gameData} />
    </article>
  );
};
