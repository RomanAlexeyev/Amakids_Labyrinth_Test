import { createSlice } from "@reduxjs/toolkit";

const gridSlice = createSlice({
  name: "grid",
  initialState: {
    rowsQ: 3,
    columnsQ: 3,
    movesQ: 10,
    currentStart: {row: null, col: null},
    currentFinish: {row: null, col: null},
    movesSuccession: [],
  },
  reducers: {
    setCurrentStart(state, action) {
        state.currentStart.row = action.payload.row;
        state.currentStart.col = action.payload.col;
    },
    setCurrentFinish(state, action) {
        state.currentFinish.row = action.payload.row;
        state.currentFinish.col = action.payload.col;
    },
    setMovesSuccession(state, action) {
        state.movesSuccession.push(action.payload)
    },
    resetMoves(state) {
        state.movesSuccession = [];
        state.currentStart.row = null;
        state.currentStart.col = null;
        state.currentFinish.row = null;
        state.currentFinish.col = null;
    }
  },
});

export const { setCurrentStart, setCurrentFinish, setMovesSuccession, resetMoves } = gridSlice.actions;

export default gridSlice.reducer;
