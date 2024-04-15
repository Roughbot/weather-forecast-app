import { configureStore } from "@reduxjs/toolkit";
import favReducer, { favLocalStorageMiddleware } from "../features/favSlice";
import recentReducer, {
  recentLocalStorageMiddleware,
} from "../features/recentSlice";

export const store = configureStore({
  reducer: {
    fav: favReducer,
    recent: recentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      favLocalStorageMiddleware,
      recentLocalStorageMiddleware
    ),
});
