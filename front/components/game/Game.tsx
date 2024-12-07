import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { NeighborsDeck } from '../neighborsDeck/NeighborsDeck';
import { PlayerDataDisplay } from '../player/PlayerDataDisplay';
import { useTranslation } from 'react-i18next';

type GameDataDisplayProps = {
  playerId: PlayerId;
  gameData: GameData;
};
export const GameDataDisplay = ({
  gameData,
  playerId,
}: GameDataDisplayProps) => {
  const { t } = useTranslation();
  const itsYourTurn = gameData.turn?.current.player.id === playerId;
  const isMarketOpen = itsYourTurn && !!gameData.turn?.current.canBuyNeighbor;
  return (
    <article className="flex flex-col gap-2 p-2 border">
      <p>
        <b>{t('game.game.game')}</b>
      </p>
      <p>
        {t('game.game.id')}: {gameData.id}
      </p>
      <p>
        {t('game.game.state')}: {gameData.state}
      </p>
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
      <p>{t('game.game.players')}:</p>
      <div className="flex gap-2">
        {gameData.players
          .slice()
          .sort((a, b) => (a.id === playerId ? -1 : b.id === playerId ? 1 : 0))
          .map((player) => (
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
