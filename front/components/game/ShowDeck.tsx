import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { useTranslation } from 'react-i18next';

type ShowDeckDisplayProps = {
  playerId: PlayerId;
  gameData: GameData;
};
export const ShowDeckDisplay = ({
  gameData,
  playerId,
}: ShowDeckDisplayProps) => {
  const { t } = useTranslation();

  const PlayerReady = () => {
    socket.emit('playerReady');
  };

  return (
    <article className="flex flex-col gap-2 p-2">
      {gameData.players.map((player) => {
        return (
          <div key={player.id}>
            {player.id === playerId && (
              <div>
                <h1>{player.name}</h1>
                <button
                  onClick={PlayerReady}
                >{`Commencer la partie (${gameData.playersReady.length}/${gameData.players.length})`}</button>
              </div>
            )}
          </div>
        );
      })}
    </article>
  );
};
