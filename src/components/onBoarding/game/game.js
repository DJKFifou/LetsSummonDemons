import React, { useState } from 'react';
import styles from "./game.module.scss";
import { demons } from "../../tables/demons";
import playerList from "../register/register";

function Game() {
  const [demonCards, setDemonCards] = useState([]);
  
  for (let i = 0; i < playerList.length; i++) {
    const randomIndex = Math.floor(Math.random() * demons.length);
    const randomDemon = demons.splice(randomIndex, 1)[0];
    setDemonCards(prevDemonCards => [...prevDemonCards, { player: playerList[i], demon: randomDemon }]);
  }

  function rollButton() {
    function diceShuffle() {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      return [die1, die2];
    }
    const result = diceShuffle();
    console.log(`Dé 1: ${result[0]}, Dé 2: ${result[1]}`);
    console.log(result[0] + result[1]);
  }

  return (
    <div className={styles.App}>
      {demonCards.map((card, index) => (
        <div key={index}>
          <p>Player: {card.player}</p>
          <p>Demon: {card.demon}</p>
        </div>
      ))}
      <button id="rollButton" onClick={rollButton}>Lancer les dés</button>
    </div>
  );
}

export default Game;