// store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './src/components/CategoriesMenu/categoriesSlice'
import bigNumbersReducer from './src/components/BigNumbers/bigNumbersSlice'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    bigNumbers: bigNumbersReducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export default store;
