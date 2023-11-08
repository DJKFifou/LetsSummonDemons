import React, { useState } from 'react';
import styles from "./game.module.scss";
import { demons } from "../../tables/demons";
import { useLocation } from "react-router-dom";

function Game(props) {
  const [demonCards, setDemonCards] = useState([]);
  let { playerList } = useLocation();
  console.log(playerList);
  
  
  for (let i = 0; i < playerList.length; i++) {
    const randomIndex = Math.floor(Math.random() * demons.length);
    const randomDemon = demons.splice(randomIndex, 1)[0];
    const result = { player: playerList[i], demon: randomDemon };
    console.log(result);
    setDemonCards(prevDemonCards => [...prevDemonCards, result]);
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
