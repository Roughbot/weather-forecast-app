import { createSlice, nanoid, Middleware } from "@reduxjs/toolkit";

type Recent = {
  id: string;
  name: string;
};

// Check if localStorage is available
const getInitialRecents = () => {
  if (typeof window !== "undefined") {
    const recents = localStorage.getItem("recents");
    return recents ? JSON.parse(recents) : [];
  } else {
    return [];
  }
};

const initialState: { recents: Recent[] } = {
  recents: getInitialRecents(),
};

const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addRecent: (state, action) => {
      if (state.recents.some((recent) => recent.name === action.payload.name)) {
        return;
      }

      const recent = {
        id: nanoid(),
        name: action.payload.name,
      };

      if (state.recents.length >= 10) {
        state.recents.pop();
      }

      state.recents.push(recent);
    },
  },
});

export const { addRecent } = recentSlice.actions;

export const recentLocalStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    const recentState = getState().recent;
    // Again, check if localStorage is available before using it
    if (typeof window !== "undefined") {
      localStorage.setItem("recents", JSON.stringify(recentState.recents));
    }
    return result;
  };

export default recentSlice.reducer;
