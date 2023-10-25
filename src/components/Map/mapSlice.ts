import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Feature from "ol/Feature";

interface MapState {
  renewablePlants: number[];
  contractVisibility: boolean;
  currentContractor: string;
}

const initialState: MapState = {
  renewablePlants: [],
  contractVisibility: false,
  currentContractor: "",
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
    setContractVisibility(state, action: PayloadAction<boolean>) {
      state.contractVisibility = action.payload;
    },
    setCurrentContractor(state, action: PayloadAction<string>) {
      state.currentContractor = action.payload;
    },
  },
});

export const { setRenewablePlants, setContractVisibility, setCurrentContractor } = mapSlice.actions;

export default mapSlice.reducer;
