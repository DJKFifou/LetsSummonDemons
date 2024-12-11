import { socket } from '@/socket';
import { useEffect, useState } from 'react';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { useTranslation } from 'react-i18next';
import { Card } from '../card/Card';

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

  console.log('gameData', gameData);

  return (
    <article className="flex flex-col gap-2 p-2">
      {gameData.players.map((player) => (
        <div key={player.id}>
          {player.id === playerId && (
            <div className="flex flex-col items-center gap-16">
              <h1 className="text-7xl">VOTRE DECK</h1>
              <div className="flex gap-2">
                {player.candleCard && (
                  <Card cardData={player.candleCard} width={'w-40'} />
                )}
              </div>
              <div className="flex gap-12">
                {player.coveredDemonsCards.map((card) => (
                  <div key={card.id}>
                    <Card cardData={card} width={'w-40'} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-8">
                <p>{`Vous commencez avec ${player.soulsTokenCount} âmes`}</p>
                <button
                  onClick={PlayerReady}
                  className="w-96 py-4 px-6 bg-white text-black"
                >
                  {`Commencer la partie (${playersReady.length}/${gameData.players.length})`}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </article>
  );
};
