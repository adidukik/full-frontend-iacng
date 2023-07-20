import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BigNumber = 0 | 1 | 2;

const initialState: BigNumber = 0;

const bigNumbersSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setBigNumbers: (state, action: PayloadAction<BigNumber>) => {
      return action.payload;
    }
  }
});

export const { setBigNumbers } = bigNumbersSlice.actions;

export default bigNumbersSlice.reducer;