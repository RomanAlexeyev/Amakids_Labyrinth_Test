import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    newGame: false,
    isReady: false,
    choiceIsMade: false,
    isWinner: false,
  },
  reducers: {
    setNewGame(state, action) {
        state.newGame = action.payload;
    },
    setIsReady(state, action) {
        state.isReady = action.payload;
    },
    setChoiceIsMade(state, action) {
        state.choiceIsMade = action.payload;
    },
    setIsWinner(state, action) {
        state.isWinner = action.payload;
    },
  },
});

export const { setNewGame, setIsReady, setChoiceIsMade, setIsWinner } = gameSlice.actions;

export default gameSlice.reducer;
