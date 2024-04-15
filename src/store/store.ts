import { configureStore } from "@reduxjs/toolkit";
import favReducer from "../features/favSlice";
import recentReducer from "../features/recentSlice";

export const store = configureStore({
  reducer: {
    fav: favReducer,
    recent: recentReducer,
  },
});
