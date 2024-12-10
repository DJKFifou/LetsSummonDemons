import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

type ShowDeckDisplayProps = {
  playerId: PlayerId;
  gameData: GameData;
};

export const ShowDeckDisplay = ({
  gameData,
  playerId,
}: ShowDeckDisplayProps) => {
  const { t } = useTranslation();
  const [playersReady, setPlayersReady] = useState(gameData.playersReady);

  const PlayerReady = () => {
    socket.emit('playerReady');
  };

  useEffect(() => {
    const handlePlayerReadyUpdate = (updatedPlayersReady: string[]) => {
      setPlayersReady(updatedPlayersReady);
    };

    socket.on('playersReadyUpdate', handlePlayerReadyUpdate);

    return () => {
      socket.off('playersReadyUpdate', handlePlayerReadyUpdate);
    };
  }, []);

  return (
    <article className="flex flex-col gap-2 p-2">
      {gameData.players.map((player) => (
        <div key={player.id}>
          {player.id === playerId && (
            <div>
              <h1>{player.name}</h1>
              <button
                onClick={PlayerReady}
              >{`Commencer la partie (${playersReady.length}/${gameData.players.length})`}</button>
            </div>
          )}
        </div>
      ))}
    </article>
  );
};
