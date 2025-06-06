import React, { useState } from 'react';

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * MAIN CONTAINER for the "TicTacToe Classic" game.
   * - Two player mode: Alternates X/O
   * - Win/draw detection and messaging
   * - Restart functionality
   * - Centered board, light theme, themed with { primary: #fff, secondary: #222, accent: #2196f3 }
   */
  const EMPTY_BOARD = Array(9).fill(null);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Calculate winner and draw
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6]  // diags
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle click on a square
  const handleClick = (idx) => {
    if (board[idx] || winner || isDraw) {
      return;
    }
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    const win = calculateWinner(nextBoard);
    const draw = !win && nextBoard.every(cell => cell);
    setBoard(nextBoard);
    setWinner(win);
    setIsDraw(draw);
    setXIsNext(!xIsNext);
  };

  // Restart: reset all state
  const handleRestart = () => {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  // Cell rendering
  const renderCell = (idx) => (
    <button
      className="ttt-cell"
      style={{
        color: board[idx] === "X" ? "#222" : "#2196f3"
      }}
      onClick={() => handleClick(idx)}
      aria-label={board[idx] ? `Cell ${idx+1} - ${board[idx]}` : `Cell ${idx+1}, empty`}
      disabled={Boolean(board[idx]) || winner || isDraw}
    >
      {board[idx]}
    </button>
  );

  // Status Message
  let statusMsg;
  if (winner) {
    statusMsg = (
      <span style={{color: "#2196f3", fontWeight: 600}}>Winner: {winner}</span>
    );
  } else if (isDraw) {
    statusMsg = <span style={{color: "#222", fontWeight: 600}}>It&#39;s a Draw!</span>;
  } else {
    statusMsg = (
      <span>
        <span style={{color: "#2196f3", fontWeight: 600}}>
          {xIsNext ? 'X' : 'O'}
        </span>
        &nbsp;turn
      </span>
    );
  }

  return (
    <div className="ttt-classic-main">
      <div className="ttt-status" style={{marginBottom: 24, fontSize: "1.25rem"}}>
        {statusMsg}
      </div>
      <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
        {[0,1,2].map((row) => (
          <div className="ttt-board-row" role="row" key={row}>
            {[0,1,2].map(col => renderCell(row*3+col))}
          </div>
        ))}
      </div>
      <div className="ttt-actions" style={{marginTop: 24, textAlign: "center"}}>
        {(winner || isDraw) && (
          <button className="btn btn-large ttt-restart-btn" onClick={handleRestart}>
            Restart Game
          </button>
        )}
      </div>

      {/* Inline component-specific styles */}
      <style>{`
        .ttt-classic-main {
          background: #fff;
          color: #222;
          padding: 40px 24px 24px 24px;
          border-radius: 18px;
          max-width: 400px;
          margin: 56px auto 0 auto;
          box-shadow: 0 4px 24px 0 rgba(34, 34, 34, 0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ttt-status {
          text-align: center;
          min-height: 32px;
          margin-bottom: 8px;
          font-family: inherit;
        }
        .ttt-board {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .ttt-board-row {
          display: flex;
        }
        .ttt-cell {
          width: 72px;
          height: 72px;
          background: #fff;
          border: 2px solid #222222;
          border-radius: 12px;
          margin: 7px;
          font-size: 2.3rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          box-shadow: 0 1px 8px 0 rgba(34,34,34,0.06);
          transition: background .2s, color .2s, border-color .2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ttt-cell:disabled {
          cursor: default;
          opacity: 0.6;
          background: #f6f6f6;
        }
        .ttt-cell:hover:not(:disabled) {
          border-color: #2196f3;
          background: #f0f8ff;
        }
        .ttt-actions .ttt-restart-btn {
          background: #2196f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1.05rem;
          font-weight: 500;
          padding: 12px 32px;
          margin-top: 8px;
          box-shadow: 0 2px 8px rgba(33,150,243,0.08);
        }
        .ttt-actions .ttt-restart-btn:hover {
          background: #176dd4;
        }
        @media (max-width: 600px) {
          .ttt-classic-main {
            max-width: 98vw;
            padding: 16px 4px 16px 4px;
            margin: 20px 1vw 0 1vw;
          }
          .ttt-cell {
            width: 56px;
            height: 56px;
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  );
}

export default TicTacToeClassic;
