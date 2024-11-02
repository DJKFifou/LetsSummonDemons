import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { NeighborsDeck } from '../neighborsDeck/NeighborsDeck';
import { PlayerDataDisplay } from '../player/PlayerDataDisplay';

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
    <article className="flex flex-col gap-2 p-2 border">
      <p>
        <b>GAME</b>
      </p>
      <p>ID: {gameData.id}</p>
      <p>STATE: {gameData.state}</p>
      <div className="flex flex-col gap-2 p-2 border">
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
      <div className="flex gap-2">
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
