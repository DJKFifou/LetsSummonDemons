'use client';
import { IngameScreen } from '@/components/screens/IngameScreen';
import { JoinOrCreateGameScreen } from '@/components/screens/JoinOrCreateGameScreen';
import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerId } from '@lsd/back/contracts/player';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [playerId, setPlayerId] = useState<PlayerId | null>(null);

  const onConnect = () => {
    setIsConnected(true);
    console.log('connected');
  };

  const onDisconnect = () => {
    setIsConnected(false);
    console.log('disconnected');
  };

  const onPlayerId = (receivedPlayerId: PlayerId) => {
    setPlayerId(receivedPlayerId);
  };

  const onGameData = (receivedGameData: GameData) => {
    setGameData(receivedGameData);
  };

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('playerId', onPlayerId);
    socket.on('gameData', onGameData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('playerId', onPlayerId);
      socket.off('gameData', onGameData);
    };
  }, []);

  return (
    <main>
      <p>Connected to back: {isConnected ? 'true' : 'false'}</p>
      {isConnected ? (
        <>
          {gameData && playerId ? (
            <IngameScreen playerId={playerId} gameData={gameData} />
          ) : (
            <JoinOrCreateGameScreen />
          )}
        </>
      ) : (
        ''
      )}
    </main>
  );
}
