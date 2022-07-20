import { configureStore } from "@reduxjs/toolkit";

import gridReducer from "./gridSlice";
import gameReducer from "./gameSlice";

export default configureStore({
  reducer: {
    grid: gridReducer,
    game: gameReducer,
  },
});