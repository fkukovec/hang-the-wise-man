import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuote = createAsyncThunk("game/fetchQuote", async () => {
  const response = await axios.get("https://api.quotable.io/random");
  return response.data;
});

const initialState = {
  playerName: "",
  quote: "",
  quoteId: "",
  guessedLetters: [],
  errors: 0,
  status: "idle",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
    guessLetter: (state, action) => {
      const letter = action.payload.toLowerCase();
      if (!state.guessedLetters.includes(letter)) {
        state.guessedLetters.push(letter);
        if (!state.quote.toLowerCase().includes(letter)) {
          state.errors += 1;
        }
      }
    },
    resetGame: (state) => {
      state.guessedLetters = [];
      state.errors = 0;
      state.quote = "";
      state.quoteId = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.quote = action.payload.content;
        state.quoteId = action.payload._id;
        state.status = "succeeded";
        state.guessedLetters = [];
        state.errors = 0;
      })
      .addCase(fetchQuote.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setPlayerName, guessLetter, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
