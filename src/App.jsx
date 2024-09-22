import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
	X: 'player1',
	O: 'player2'
  }

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const getWinner = (gameBoard, players) => {
	let winner;
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
		  gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
		  gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
		  gameBoard[combination[2].row][combination[2].column];
		if (
		  firstSquareSymbol &&
		  firstSquareSymbol === secondSquareSymbol &&
		  firstSquareSymbol === thirdSquareSymbol
		) {
		  winner = players[firstSquareSymbol];
		}
	  }
	  return winner
  }

  const getGameBoard = gameTurns => {
	let gameBoard = JSON.parse(JSON.stringify(INITIAL_GAME_BOARD));
  	for (const turn of gameTurns) {
		const {
		square: { row, col },
		player,
		} = turn;
		gameBoard[row][col] = player;
  	}
	return gameBoard
  }
  


function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns);
  
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handlePlayerNameChange = (symbol, newName) => {
	setPlayers(prevPlayers => ({
		...prevPlayers,
		[symbol] : newName
	}))
  }
  
  let gameBoard = getGameBoard(gameTurns)
  let winner = getWinner(gameBoard, players);
  let hasDraw = gameTurns.length === 9 && !winner

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol={"X"} isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol={"O"} isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange}/>
        </ol>
		{(winner || hasDraw) && <GameOver winner={winner} reStartGame={() => setGameTurns([])}/>}
        <GameBoard handleSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
