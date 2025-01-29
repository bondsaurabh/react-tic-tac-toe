import React, { useState } from 'react';
import '../styles/App.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [theme, setTheme] = useState('light');
  const [playerXName, setPlayerXName] = useState('Player X');
  const [playerOName, setPlayerOName] = useState('Player O');
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });

  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent overwriting or clicking after game ends

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    calculateWinner(newBoard);
  };

  const calculateWinner = (newBoard) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],            // Diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setScores((prevScores) => ({
          ...prevScores,
          [newBoard[a]]: prevScores[newBoard[a]] + 1,
        }));
        return;
      }
    }

    if (newBoard.every(cell => cell)) {
      setWinner('Draw');
      setScores((prevScores) => ({
        ...prevScores,
        Draw: prevScores.Draw + 1,
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`game-container ${theme}`}>
      <h1>Tic-Tac-Toe</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      <div className="player-names">
        <input
          type="text"
          placeholder="Enter Player X's name"
          value={playerXName}
          onChange={(e) => setPlayerXName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Player O's name"
          value={playerOName}
          onChange={(e) => setPlayerOName(e.target.value)}
        />
      </div>

      <div className="turn-indicator">
        {winner ? '' : `Player's Turn: ${isXNext ? playerXName : playerOName}`}
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? 'disabled' : ''} ${winner && winner !== 'Draw' && cell === winner ? 'winner-cell' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="winner">
          {winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner === 'X' ? playerXName : playerOName}`}
        </div>
      )}

      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <p>{playerXName}: {scores.X}</p>
        <p>{playerOName}: {scores.O}</p>
        <p>Draws: {scores.Draw}</p>
      </div>

      <button className="reset-button" onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default TicTacToe;