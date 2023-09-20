import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Feature from "ol/Feature";

interface MapState {
  renewablePlants: number[];
}

const initialState: MapState = {
  renewablePlants: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setRenewablePlants(state, action: PayloadAction<number[]>) {
      if (state.renewablePlants.length === 0) {
        state.renewablePlants = action.payload;
      }
    },
  },
});

export const { setRenewablePlants } = mapSlice.actions;

export default mapSlice.reducer;
