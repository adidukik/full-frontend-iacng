// store.ts

import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../components/CategoriesMenu/categoriesSlice'

const store = configureStore({
  reducer: {
    categories: categoriesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
