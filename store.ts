import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./src/components/CategoriesMenu/categoriesSlice";
import bigNumbersReducer from "./src/components/BigNumbers/bigNumbersSlice";
import regionsReducer from "./src/components/Regions/regionsSlice";
import authReducer from "./src/components/LoginPage/authSlice";
import mapReducer from "./src/components/Map/mapSlice";
import opecReducer from "./src/components/OpecGraph/opecSlice";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  bigNumbers: bigNumbersReducer,
  regions: regionsReducer,
  auth: authReducer,
  map: mapReducer,
  opec: opecReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
