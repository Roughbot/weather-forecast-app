import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCelsius: true,
};

const temperatureSlice = createSlice({
  name: "temperature",
  initialState,
  reducers: {
    toggleTemperatureUnit: (state) => {
      state.isCelsius = !state.isCelsius;
    },
  },
});

export const { toggleTemperatureUnit } = temperatureSlice.actions;
export default temperatureSlice.reducer;
