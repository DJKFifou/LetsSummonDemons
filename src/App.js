import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/onBoarding/register/register';
import Game from './components/onBoarding/game/game';
import StartGame from './components/onBoarding/startGame/startGame';
import './App.scss';

function App() {
  const [playerList, setPlayerList] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/register" element={<Register playerList={playerList} setPlayerList={setPlayerList} />} />
        <Route path="/game" element={<Game playerList={playerList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;