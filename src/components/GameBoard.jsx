import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guessLetter, resetGame, fetchQuote } from "../redux/gameSlice";
import { useNavigate } from "react-router-dom";
import MaskedQuoteText from "./MaskedQuoteText";
import axios from "axios";

const GameBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { guessedLetters, errors, playerName, quote, quoteId, status } =
    useSelector((state) => state.game);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (!quote) {
      dispatch(fetchQuote());
    }
    setIsGameWon(false);
  }, [dispatch, quote]);

  useEffect(() => {
    if (errors >= 6) {
      navigate("/scoreboard");
    }
  }, [errors, navigate]);

  useEffect(() => {
    if (
      quote &&
      [...quote].every(
        (char) =>
          !/[a-zA-Z]/.test(char) || guessedLetters.includes(char.toLowerCase())
      )
    ) {
      setIsGameWon(true);
    }
  }, [quote, guessedLetters]);

  useEffect(() => {
    if (isGameWon) {
      submitScore();
    }
  }, [isGameWon]);

  const submitScore = async () => {
    const uniqueCharacters = new Set(
      quote.replace(/[^a-zA-Z]/g, "").toLowerCase()
    ).size;

    const payload = {
      quoteId,
      length: quote.length,
      uniqueCharacters,
      userName: playerName,
      errors,
    };

    await axios.post(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    navigate("/scoreboard");
  };

  const handleGuess = (letter) => {
    dispatch(guessLetter(letter));
  };

  const handleRestart = () => {
    dispatch(resetGame());
    setIsGameWon(false);
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      {status === "loading" ? (
        "Loading..."
      ) : (
        <MaskedQuoteText
          base={quote || ""}
          revealed={new Set(guessedLetters)}
        />
      )}
      <p>Errors: {errors} / 6</p>
      <div>
        {"abcdefghijklmnopqrstuvwxyz".split("").map((char) => (
          <button
            key={char}
            onClick={() => handleGuess(char)}
            disabled={guessedLetters.includes(char)}
          >
            {char}
          </button>
        ))}
      </div>
      <br />
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default GameBoard;
