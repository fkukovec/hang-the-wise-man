import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../redux/gameSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScoreBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playerName, errors } = useSelector((state) => state.game);
  const [highScores, setHighScores] = useState([]);
  const playerScore = (100 / (1 + errors)).toFixed(2);

  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"
      )
      .then((response) =>
        setHighScores(
          [
            ...response.data,
            {
              userName: playerName,
              score: playerScore,
            },
          ].sort((a, b) => b.score - a.score)
        )
      );
  }, [playerName, errors]);

  const handleNewGame = () => {
    dispatch(resetGame());
    navigate("/");
  };

  return (
    <div>
      <h1>High Scores</h1>
      <h2>Your Score: {playerScore}</h2>
      <ul>
        {highScores.map((score, index) => (
          <li key={index}>
            {score.userName}: {score.score}
          </li>
        ))}
      </ul>
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
};

export default ScoreBoard;
