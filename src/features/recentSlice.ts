import { createSlice, nanoid } from "@reduxjs/toolkit";

type Recent = {
  id: string;
  name: string;
};

const initialState: { recents: Recent[] } = {
  recents: [],
};

const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addRecent: (state, action) => {
      const recent = {
        id: nanoid(),
        name: action.payload.name,
      };
      state.recents.push(recent);
    },
  },
});

export const { addRecent } = recentSlice.actions;

export default recentSlice.reducer;
