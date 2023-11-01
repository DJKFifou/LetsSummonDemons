import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/onBoarding/register/register';
import Game from './components/onBoarding/game/game';
import StartGame from './components/onBoarding/startGame/startGame';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;