import { MIN_GAME_PLAYER } from '@lsd/common/contracts';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Game from './components/onBoarding/game/game';
import Register from './components/onBoarding/register/register';
import StartGame from './components/onBoarding/startGame/startGame';

console.log(MIN_GAME_PLAYER);

function App() {
  const [playerList, setPlayerList] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route
          path="/register"
          element={
            <Register playerList={playerList} setPlayerList={setPlayerList} />
          }
        />
        <Route path="/game" element={<Game playerList={playerList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
