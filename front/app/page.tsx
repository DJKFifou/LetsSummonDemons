'use client';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from '@lsd/back/contracts/io';
import { PlayerData } from '@lsd/back/contracts/player';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket<
    IServerToClientEvents,
    IClientToServerEvents
  > | null>(null);
  const [name, setName] = useState('');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    // Create a socket connection
    const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(
      'ws://localhost:3010',
    );

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('disconnected');
    });

    socket.on('playerData', (receivedPlayerData) =>
      setPlayerData(receivedPlayerData),
    );

    setSocket(socket);

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const createGame = () => {
    if (!socket) {
      return;
    }

    console.log('create game');

    socket.emit('gameCreate', { name });
  };

  return (
    <main>
      <p>Connected to back: {isConnected ? 'true' : 'false'}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={createGame}>Créer une partie</button>
      <div>{JSON.stringify(playerData)}</div>
    </main>
  );
}
