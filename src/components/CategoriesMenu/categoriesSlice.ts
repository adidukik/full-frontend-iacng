import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Category = 'нефтегазовая отрасль' | 'электроэнергетика' | 'урановая промышленность';

const initialState: Category = 'нефтегазовая отрасль';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      return action.payload;
    }
  }
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
