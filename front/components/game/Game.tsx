import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { NeighborsDeck } from '../neighborsDeck/NeighborsDeck';
import { PlayerDataDisplay } from '../player/PlayerDataDisplay';
import styles from './Game.module.scss';

type GameDataDisplayProps = {
  playerId: PlayerId;
  gameData: GameData;
};
export const GameDataDisplay = ({
  gameData,
  playerId,
}: GameDataDisplayProps) => {
  const itsYourTurn = gameData.turn?.current.player.id === playerId;

  const isMarketOpen = itsYourTurn && !!gameData.turn?.current.canBuyNeighbor;
  return (
    <article className={styles.game}>
      <p>
        <b>GAME</b>
      </p>
      <p>ID: {gameData.id}</p>
      <p>STATE: {gameData.state}</p>
      <div className={styles.neighbourDeck}>
        {gameData.neighborsDeck && (
          <NeighborsDeck
            gameData={gameData}
            isMarketOpen={isMarketOpen}
            neighborsDeck={gameData.neighborsDeck}
            itsYou={gameData.turn?.current.cardSelector === playerId}
          />
        )}
      </div>
      <p>PLAYERS:</p>
      <div className={styles.players}>
        {gameData.players.map((player) => (
          <PlayerDataDisplay
            gameData={gameData}
            playerData={player}
            itsTurn={gameData.turn?.current.player.id === player.id}
            itsYou={player.id === playerId}
            key={player.id}
          />
        ))}
      </div>
    </article>
  );
};
