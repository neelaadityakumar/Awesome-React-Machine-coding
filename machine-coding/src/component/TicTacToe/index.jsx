import { useState } from "react";

const WINNING_CELLS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function determineWinner(board) {
  for (const [x, y, z] of WINNING_CELLS) {
    if (board[x] && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }
  return null;
}

function Cell({ index, disabled, mark, turn, onClick }) {
  return (
    <button
      className="w-20 h-20 flex items-center justify-center text-4xl font-bold border border-gray-400 bg-white hover:bg-gray-100 disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
      aria-label={mark == null ? `Mark cell ${index} as ${turn}` : undefined}
    >
      {mark}
    </button>
  );
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(true);

  const winner = determineWinner(board);

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsPlaying(true);
  }

  function getStatusMessage() {
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${xIsPlaying ? "X" : "O"}'s turn`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="text-lg font-semibold mb-2">{getStatusMessage()}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((mark, index) => (
          <Cell
            key={index}
            index={index}
            mark={mark}
            turn={xIsPlaying ? "X" : "O"}
            disabled={mark !== null || winner !== null}
            onClick={() => {
              if (mark || winner) return;
              const newBoard = [...board];
              newBoard[index] = xIsPlaying ? "X" : "O";
              setBoard(newBoard);
              setXIsPlaying(!xIsPlaying);
            }}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Reset
      </button>
    </div>
  );
}
