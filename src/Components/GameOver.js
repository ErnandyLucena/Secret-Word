import React from 'react';
import './GamerOver.css';

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game Over Noob</h1>
      <h2>Pontuação final: <span>{score}</span></h2>
      <button onClick={retry}>Restart Game</button>
    </div>
  );
};

export default GameOver;
