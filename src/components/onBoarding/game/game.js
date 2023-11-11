import React, { useState, useEffect } from 'react';
import styles from "./game.module.scss";
import { demons } from "../../array/demons";
import { cierges } from "../../array/cierges";
import { neighbour } from "../../array/voisinage";
import { neighbourStack } from "../../array/voisinage";

function Game({ playerList }) {
  const [demonCards, setDemonCards] = useState([]);
  const [ciergeCards, setCiergeCards] = useState([]);
  const [neighbourCards, setNeighbourCards] = useState([]);
  const [remainingNeighbourCards, setRemainingNeighbourCards] = useState(neighbour);

  

  function shuffleArray(array) {
    // Créez une copie du tableau avant de le mélanger
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  useEffect(() => {
    // Créez des copies des tableaux de démons, de cierges et de voisinnages
    const shuffledDemons = shuffleArray(demons);
    const shuffledCierges = shuffleArray(cierges);


    const playerDemonCards = [];
    const playerCiergeCards = [];

    for (let i = 0; i < playerList.length; i++) {
      const playerDemons = [];
      for (let j = 0; j < 3; j++) {
        // Utilisez la copie du tableau de démons
        const randomIndex = Math.floor(Math.random() * shuffledDemons.length);
        const randomDemon = shuffledDemons.splice(randomIndex, 1)[0];
        playerDemons.push(randomDemon);
      }

      const playerCierges = [];
      for (let j = 0; j < 1; j++) {
        // Utilisez la copie du tableau de cierges
        const randomIndex = Math.floor(Math.random() * shuffledCierges.length);
        const randomCierge = shuffledCierges.splice(randomIndex, 1)[0];
        playerCierges.push(randomCierge);
      }

      const card = { player: playerList[i], demons: playerDemons, cierges: playerCierges };
      playerDemonCards.push(card);
      playerCiergeCards.push(card);
    }

    setDemonCards(playerDemonCards);
    setCiergeCards(playerCiergeCards);

    
    const drawnCards = remainingNeighbourCards.slice(0, 5);
    setRemainingNeighbourCards(remainingNeighbourCards.slice(5));
    setNeighbourCards(drawnCards);
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
                <img src={demon.cardImage} alt={`Card for ${demon.name}`} />
              </span>
            ))}
          </p>
        </div>
      ))}
      {ciergeCards.map((card, index) => (
        <div key={index}>
          <p>Player: {card.player}</p>
          <p>Cierges:
            {card.cierges.map((cierge, ciergeIndex) => (
              <span key={ciergeIndex}>
                Name: {cierge.name}, Number: {cierge.number.join(", ")}, Description: {cierge.description}, SubDescription: {cierge.subDescription}
                <img src={cierge.cardImage} alt={`Card for ${cierge.name}`} />
              </span>
            ))}
          </p>
        </div>
      ))}
      {neighbourCards.map((card, index) => (
        <div key={index}>
          <p>Neighbour Card {index + 1}:</p>
          <p>Name: {card.name}, Number: {card.number}, Description: {card.description}, SubDescription: {card.subDescription}</p>
          <img src={card.cardImage} alt={`Card for ${card.name}`} />
        </div>
      ))}
      <button id="rollButton" onClick={rollButton}>Lancer les dés</button>
    </div>
  );
}

export default Game;