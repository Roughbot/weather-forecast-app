import { configureStore } from "@reduxjs/toolkit";
import favReducer, { favLocalStorageMiddleware } from "../features/favSlice";
import recentReducer, {
  recentLocalStorageMiddleware,
} from "../features/recentSlice";
import tempReducer from "../features/convertSlice";

export const store = configureStore({
  reducer: {
    fav: favReducer,
    recent: recentReducer,
    temperature: tempReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      favLocalStorageMiddleware,
      recentLocalStorageMiddleware
    ),
});
