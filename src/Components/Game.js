import React, { useState, useRef, useCallback, useEffect } from 'react';
import VictoryScreen from './VictoryScreen';
import './Game.css';

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  endGame,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  const isGuessed = useCallback((letter) => guessedLetters.includes(letter), [guessedLetters]);
  const isCorrect = useCallback((letter) => letters.includes(letter), [letters]);

  const isVictory = useCallback(() => {
    for (let letter of letters) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  }, [guessedLetters, letters]);

  const isDefeat = useCallback(() => guesses <= 0, [guesses]);

  const updateGame = useCallback(() => {
    if (isVictory()) {
      setGameOver(true);
    } else if (isDefeat()) {
      setGameOver(true);
    }
  }, [isVictory, isDefeat]);

  useEffect(() => {
    updateGame();
  }, [guessedLetters, updateGame]);

  const handleRetry = () => {
    endGame(true); // Reinicia o jogo
  };

  return (
    <div className='game'>
      {gameOver ? (
        <VictoryScreen retry={handleRetry} />
      ) : (
        <>
          <p className='points'>
            <span className='pontuacao'>Pontuação: {score}</span>
          </p>
          <h1>Adivinhe a palavra:</h1>
          <h3 className='tip'>
            Dica sobre a palavra: <span className='span-tip'>{pickedCategory}</span>
          </h3>
          <p>Você ainda tem {guesses} tentativa(s).</p>
          <div className="wordContainer">
            {letters.map((letter, i) => (
              isGuessed(letter) ? (
                <span key={i} className="letter">{letter}</span>
              ) : (
                <span key={i} className="blankSquare"></span>
              )
            ))}
          </div>
          <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
              <input type="text" name='letter' maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
              <button>Jogar!</button>
            </form>
          </div>
          <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {wrongLetters.map((letter, i) => (
              <span key={i}>{letter},</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
