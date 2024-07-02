import './StartScreen.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <div className="start-legenda">
        <img className="logo" src="/images/logo.png" alt="Logo" />
        <h1>Secret Word</h1>
        <p>Clique no botão para iniciar</p>
        <button onClick={startGame}>Iniciar</button>
      </div>
      <img className='pop' src="/images/lol-wall.jpg" alt="" srcset="" />
    </div>
  );
};

export default StartScreen;
