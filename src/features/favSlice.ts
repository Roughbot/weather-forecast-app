import { createSlice, nanoid } from "@reduxjs/toolkit";

type Fav = {
  id: string;
  name: string;
};

const initialState: { favs: Fav[] } = {
  favs: [],
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
      state.favs = state.favs.filter((fav) => fav.id !== action.payload.id);
    },
  },
});

export const { addFav, removeFav } = favSlice.actions;

export default favSlice.reducer;
