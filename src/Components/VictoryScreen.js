import './VictoryScreen.css';
import React from 'react';

const VictoryScreen = ({ retry }) => {
  return (
    <div className="victory">
      <h1>Vitória!</h1>
      <p>Parabéns, você acertou a palavra secreta!</p>
      <button onClick={retry}>Jogar Novamente</button>
    </div>
  );
};

export default VictoryScreen;
