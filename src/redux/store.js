import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
