import React from './Game.css'

const Game = ({verifyLetter}) => {
  return (
    <div className='game'>

        <p className='points'>
            <span>
                pontuação: 000
            </span>
        </p>
        <h1>Adivinhe a palavra:</h1>
        <h3 className='tip'>
            Dica sobre a palavra: <span>Dica...</span>
        </h3>
        <div className="wordContainer">
            <span className='letter'>A</span>
            <span className="blankSquare"></span>
        </div>
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra:</p>
            <form>
                <input type="text" name='letter' maxLength="1" required />
                <button>jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras já utilizadas</p>
            <span>b, a, c</span>
        </div>
    </div>
  )
}

export default Game