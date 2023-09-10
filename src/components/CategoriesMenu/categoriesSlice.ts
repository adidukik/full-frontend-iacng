import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = 0 | 1 | 2 | 3;

const initialState: Category = 0;

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      return action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
