import './App.css';
import React, { useCallback, useState } from 'react';
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';
import { wordList } from './data/words';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  // Inicia o jogo
  const startGame = () => {
    const { word, category } = pickWordAndCategory();
    const wordLetters = word.split("").map(letter => letter.toLowerCase());
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(3);
    setScore(0);
    setGameStage(stages[1].name);
  };

  // Verifica se a letra está na palavra e atualiza o estado
  const verifyLetter = (letter) => {
    const lowercaseLetter = letter.toLowerCase().trim();

    if (pickedWord.toLowerCase().includes(lowercaseLetter)) {
      setGuessedLetters([...guessedLetters, lowercaseLetter]);
      setScore(score + 1);
    } else {
      setWrongLetters([...wrongLetters, lowercaseLetter]);
      setGuesses(guesses - 1);
    }
  };

  // Finaliza o jogo com vitória ou derrota
  const endGame = useCallback((isVictory) => {
    if (isVictory) {
      setGameStage(stages[2].name); // Tela de fim de jogo com vitória
    } else {
      setGameStage(stages[2].name); // Tela de fim de jogo com derrota
    }
  }, [stages]);

  // Reinicia o jogo
  const retry = () => {
    setGameStage(stages[0].name); // Volta para a tela inicial
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          endGame={endGame}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
