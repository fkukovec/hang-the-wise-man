import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPlayerName } from "../redux/gameSlice";
import { useNavigate } from "react-router-dom";

const NameInput = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(setPlayerName(name));
      navigate("/game");
    }
  };

  return (
    <div>
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default NameInput;
