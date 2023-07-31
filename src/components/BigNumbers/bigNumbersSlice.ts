import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type BigNumberTimeRange = "сутки" | "месяц" | "год";
export interface BigNumberState {
  value: number;
  currentTimeRange: BigNumberTimeRange;
  latestDate: Date;
}

const initialState: BigNumberState = {
  value: 0,
  currentTimeRange: "сутки",
  latestDate: new Date(),
};

const bigNumberSlice = createSlice({
  name: "bigNumber",
  initialState,
  reducers: {
    setBigNumberValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setCurrentTimeRange: (state, action: PayloadAction<BigNumberTimeRange>) => {
      state.currentTimeRange = action.payload;
    },
    setLatestDate: (state, action: PayloadAction<Date>) => {
      state.latestDate = action.payload;
    },
  },
});

export const { setBigNumberValue, setCurrentTimeRange, setLatestDate } =
  bigNumberSlice.actions;

export default bigNumberSlice.reducer;
