// store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './src/components/CategoriesMenu/categoriesSlice'

const rootReducer = combineReducers({
    categories: categoriesReducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export default store;
