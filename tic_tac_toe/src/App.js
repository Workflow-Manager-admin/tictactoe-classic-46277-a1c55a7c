import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span></span>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{marginTop: "88px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 140px)"}}>
          <h1 className="title" style={{fontSize: "2.4rem", letterSpacing: 1, margin: "24px 0 8px 0", color: "#222", textAlign: "center"}}>TicTacToe Classic</h1>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;