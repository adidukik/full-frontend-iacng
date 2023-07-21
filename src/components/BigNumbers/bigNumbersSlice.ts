import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface BigNumberState {
  value: number;
}

const initialState: BigNumberState = {
  value: 0
};

const bigNumberSlice = createSlice({
  name: "bigNumber",
  initialState,
  reducers: {
    setBigNumberValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      return {...state, value:action.payload};
    },
  },
});

export const { setBigNumberValue } = bigNumberSlice.actions;

export default bigNumberSlice.reducer;