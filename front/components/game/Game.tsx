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

  const positions = [
    'left-0 bottom-0',
    'left-1/4 top-0',
    'right-1/4 top-0',
    'left-0 top-1/4',
    'right-0 top-1/4',
  ];

  return (
    <article className="flex flex-col gap-2 p-2">
      {/* <p>
        <b>{t('game.game.game')}</b>
      </p>
      <p>
        {t('game.game.id')}: {gameData.id}
      </p>
      <p>
        {t('game.game.state')}: {gameData.state}
      </p> */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 p-2">
        {gameData.neighborsDeck && (
          <NeighborsDeck
            gameData={gameData}
            isMarketOpen={isMarketOpen}
            neighborsDeck={gameData.neighborsDeck}
            itsYou={gameData.turn?.current.cardSelector === playerId}
          />
        )}
      </div>
      {/* <p>{t('game.game.players')}:</p> */}
      <div className="flex gap-2">
        {gameData.players
          .slice()
          .sort((a, b) => (a.id === playerId ? -1 : b.id === playerId ? 1 : 0))
          .map((player, index) => {
            const positionClass =
              player.id === playerId ? positions[0] : positions[index];

            return (
              <div className={`absolute ${positionClass}`} key={player.id}>
                <PlayerDataDisplay
                  gameData={gameData}
                  playerData={player}
                  itsTurn={gameData.turn?.current.player.id === player.id}
                  itsYou={player.id === playerId}
                  key={player.id}
                />
              </div>
            );
          })}
      </div>
    </article>
  );
};
