import React, { useState, useEffect } from 'react';
import styles from "./game.module.scss";
import { demons } from "../../array/demons";
import { cierges } from "../../array/cierges";

function Game({ playerList }) {
  const [demonCards, setDemonCards] = useState([]);
  const [CiergeCards, setCiergeCards] = useState([]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

    useEffect(() => {
    shuffleArray(demons);

    const playerDemonCards = [];
    const playerCiergeCards = [];
    for (let i = 0; i < playerList.length; i++) {
      const playerDemons = [];
      for (let j = 0; j < 3; j++) { // Change 3 to the number of demons per player
        const randomIndex = Math.floor(Math.random() * demons.length);
        const randomDemon = demons.splice(randomIndex, 1)[0];
        playerDemons.push(randomDemon);
      }
      const playerCierges = [];
      for (let j = 0; j < 1; j++) { // Change 3 to the number of cierges per player
        const randomIndex = Math.floor(Math.random() * cierges.length);
        const randomDemon = cierges.splice(randomIndex, 1)[0];
        playerCierges.push(randomDemon);
      }
      const card = { player: playerList[i], demons: playerDemons, cierges: playerCierges };
      playerDemonCards.push(card);
      playerCiergeCards.push(card);
    }
    console.log(playerDemonCards);
    setDemonCards(playerDemonCards);
    console.log(playerCiergeCards);
    setCiergeCards(playerCiergeCards);
  }, [playerList]);

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
        <div key={index} className={styles.container}>
          <p>Player: {card.player}</p>
          <p>Demons:
            {card.demons.map((demon, demonIndex) => (
              <span key={demonIndex} className={styles.content}>
                Name: {demon.name}, Number: {demon.number}, Description: {demon.description}, SubDescription: {demon.subDescription}
                {/* Assuming cardImage is a string */}
                <img src={demon.cardImage} alt={`Card for ${demon.name}`} />
              </span>
            ))}
          </p>
        </div>
      ))}
      {CiergeCards.map((card, index) => (
        <div key={index}>
          <p>Player: {card.player}</p>
          <p>Cierges:
            {card.cierges.map((cierge, ciergeIndex) => (
              <span key={ciergeIndex}>
                Name: {cierge.name}, Number: {cierge.number.join(", ")}, Description: {cierge.description}, SubDescription: {cierge.subDescription}
                {/* Assuming cardImage is a string */}
                <img src={cierge.cardImage} alt={`Card for ${cierge.name}`} />
              </span>
            ))}
          </p>
        </div>
      ))}
      <button id="rollButton" onClick={rollButton}>Lancer les dés</button>
    </div>
  );
}

export default Game;
