import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BigNumberTimeRange = "сутки" | "месяц" | "год";
export interface BigNumberState {
  value: number;
  currentBigNumberId: string;
  currentTimeRange: BigNumberTimeRange;
  latestDate: string;
}

const initialState: BigNumberState = {
  value: 0,
  currentBigNumberId: "oil_yield",
  currentTimeRange: "сутки",
  latestDate: String(new Date()),
};

const bigNumberSlice = createSlice({
  name: "bigNumber",
  initialState,
  reducers: {
    setBigNumberValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setBigNumberId: (state, action: PayloadAction<string>) => {
      state.currentBigNumberId = action.payload;
    },
    setCurrentTimeRange: (state, action: PayloadAction<BigNumberTimeRange>) => {
      state.currentTimeRange = action.payload;
    },
    setLatestDate: (state, action: PayloadAction<Date>) => {
      state.latestDate = String(action.payload);
    },
  },
});

export const {
  setBigNumberValue,
  setBigNumberId,
  setCurrentTimeRange,
  setLatestDate,
} = bigNumberSlice.actions;

export default bigNumberSlice.reducer;
