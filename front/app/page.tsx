'use client';
import { PlayerDataDisplay } from '@/components/player/PlayerDataDisplay';
import { IngameScreen } from '@/components/screens/IngameScreen';
import { JoinOrCreateGameScreen } from '@/components/screens/JoinOrCreateGameScreen';
import { socket } from '@/socket';
import { GameData } from '@lsd/back/contracts/game';
import { PlayerData } from '@lsd/back/contracts/player';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  const onConnect = () => {
    setIsConnected(true);
    console.log('connected');
  };

  const onDisconnect = () => {
    setIsConnected(false);
    console.log('disconnected');
  };

  const onPlayerData = (receivedPlayerData: PlayerData) => {
    console.log(receivedPlayerData);

    setPlayerData(receivedPlayerData);
  };

  const onGameData = (receivedGameData: GameData) => {
    setGameData(receivedGameData);
  };

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('playerData', onPlayerData);
    socket.on('gameData', onGameData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.on('playerData', onPlayerData);
      socket.off('gameData', onGameData);
    };
  }, []);

  return (
    <main>
      <p>Connected to back: {isConnected ? 'true' : 'false'}</p>
      {playerData && (
        <PlayerDataDisplay
          playerData={playerData}
          itsTurn={gameData?.turn?.current.player.id === playerData.id}
        />
      )}
      {isConnected ? (
        <>
          {gameData && playerData ? (
            <IngameScreen gameData={gameData} playerData={playerData} />
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
