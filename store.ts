import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './src/components/CategoriesMenu/categoriesSlice'
import bigNumbersReducer from './src/components/BigNumbers/bigNumbersSlice'
import regionsReducer from './src/components/Regions/regionsSlice'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    bigNumbers: bigNumbersReducer,
    regions: regionsReducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
