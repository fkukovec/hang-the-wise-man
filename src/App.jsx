import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NameInput from "./components/NameInput";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameInput />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
