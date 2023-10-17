import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BigNumberBigNumberTab = "сутки" | "месяц" | "год" | "баррели" | "тонны";
export type BigNumberIdType =
  | "oil_yield"
  | "gas_yield"
  | "oil_prices"
  | "oil_products_yield"
  | "oil_products_prices"
  | "leftover_oil_products"
  | "export"
  | "oil_stored"
  | "well_downtime"
  | "losses"
  | "energy_generation"
  | "renewable_energy"
  | "energy_consumption"
  | "balance_flow"
  | "corporation_consumption"
  | "station_load"
  | "transit_ee"
  | "flow_middle_asia_month"
  | "opec";

export interface BigNumberState {
  value: number;
  currentBigNumberId: BigNumberIdType;
  currentBigNumberTab: BigNumberBigNumberTab;
  latestDate: string;
}

const initialState: BigNumberState = {
  value: 0,
  currentBigNumberId: "oil_yield",
  currentBigNumberTab: "сутки",
  latestDate: String(new Date()),
};

const bigNumberSlice = createSlice({
  name: "bigNumber",
  initialState,
  reducers: {
    setBigNumberValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setBigNumberId: (state, action: PayloadAction<BigNumberIdType>) => {
      state.currentBigNumberId = action.payload;
    },
    setCurrentBigNumberTab: (state, action: PayloadAction<BigNumberBigNumberTab>) => {
      state.currentBigNumberTab = action.payload;
    },
    setLatestDate: (state, action: PayloadAction<Date>) => {
      state.latestDate = String(action.payload);
    },
  },
});

export const {
  setBigNumberValue,
  setBigNumberId,
  setCurrentBigNumberTab,
  setLatestDate,
} = bigNumberSlice.actions;

export default bigNumberSlice.reducer;
