import { createSlice, nanoid, Middleware } from "@reduxjs/toolkit";

type Fav = {
  id: string;
  name: string;
};

// Check if localStorage is available
const getInitialFavs = () => {
  if (typeof window !== "undefined") {
    const favs = localStorage.getItem("favs");
    return favs ? JSON.parse(favs) : [];
  } else {
    return [];
  }
};

const initialState: { favs: Fav[] } = {
  favs: getInitialFavs(),
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addFav: (state, action) => {
      const fav = {
        id: nanoid(),
        name: action.payload.name,
      };
      state.favs.push(fav);
    },
    removeFav: (state, action) => {
      state.favs = state.favs.filter((fav) => fav.name !== action.payload.name);
    },
  },
});

export const { addFav, removeFav } = favSlice.actions;

export const favLocalStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    const favState = getState().fav;
    // Again, check if localStorage is available before using it
    if (typeof window !== "undefined") {
      localStorage.setItem("favs", JSON.stringify(favState.favs));
    }
    return result;
  };

export default favSlice.reducer;
