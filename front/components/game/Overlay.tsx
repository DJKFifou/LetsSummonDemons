import { useState } from 'react';
import { PlayerId } from '@lsd/back/contracts/player';
import { GameData } from '@lsd/back/contracts/game';
import { useTranslation } from 'react-i18next';
import { Card } from '../card/Card';

type OverlayDisplayProps = {
  playerId: PlayerId;
  gameData: GameData;
  setOverlayVisible: (visible: boolean) => void;
  selectedPlayerId: PlayerId | null;
};

export const OverlayDisplay = ({
  gameData,
  playerId,
  setOverlayVisible,
  selectedPlayerId: initialSelectedPlayerId,
}: OverlayDisplayProps) => {
  const { t } = useTranslation();

  const [selectedPlayerId, setSelectedPlayerId] = useState<PlayerId | null>(
    initialSelectedPlayerId,
  );

  const handlePlayerClick = (id: PlayerId) => {
    setSelectedPlayerId(id);
  };

  return (
    <article className="absolute bottom-0 left-0 w-full">
      <div className="flex justify-center">
        {gameData.players
          .filter((player) => player.id !== playerId)
          .map((player) => (
            <button
              key={player.id}
              className="py-2 px-6 bg-white text-black hover:bg-gray-200"
              onClick={() => handlePlayerClick(player.id)}
            >
              {player.name}
            </button>
          ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-10 p-8 bg-slate-700">
        {selectedPlayerId && (
          <div className="flex flex-col items-center gap-6">
            {gameData.players
              .filter((player) => player.id === selectedPlayerId)
              .map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="flex gap-6">
                    {player.summonedDemonsCards.map((card, index) => (
                      <Card key={index} cardData={card} width="w-32" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {player.neighborsCards.map((card, index) => (
                      <Card key={index} cardData={card} width="w-20" />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <button
        className="absolute bottom-8 right-12 py-2 px-4 bg-red-500 text-white hover:bg-red-700"
        onClick={() => setOverlayVisible(false)}
      >
        Fermer
      </button>
    </article>
  );
};
