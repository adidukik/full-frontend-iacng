import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_CONFIG } from "../../../app.config";
import { fetchCachedData } from "../../utils/fetchCachedData";
import {
  OpecCountryName,
  CountryGraphDataPoint,
  OpecState,
} from "../../interfaces/opecSlice";
import { RootState } from "../../../store";

const SECONDARY_BACKEND_URL = APP_CONFIG.SECONDARY_BACKEND_URL;
export const fetchCurrentData = createAsyncThunk(
  "opec/fetchCurrentData",
  async (_, { dispatch }) => {
    try {
      const data = await fetchCachedData(
        `${SECONDARY_BACKEND_URL}/calculate_opek_countries_quota`
      );
      // After fetching data, dispatch an action to update the state.
      dispatch(setCurrentData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors or dispatch an error action if needed.
    }
  }
);
export const fetchGraphDataByCountryName = createAsyncThunk(
  "opec/fetchGraphDataByCountryName",
  async (countryName: OpecCountryName, { dispatch, getState }) => {
    try {
      const opecState = (getState() as RootState).opec;
      if (opecState.graphDataByCountryName[countryName]) return;
      const data = await fetchCachedData<CountryGraphDataPoint[]>(
        `${SECONDARY_BACKEND_URL}/calculate_opek_by_country/${countryName}`
      );
      data.sort((a, b) => {
        if (a.year === b.year) {
          return a.month - b.month; // If years are equal, sort by months
        } else {
          return a.year - b.year; // Sort by years
        }
      });
      dispatch(setCountryInGraphData({ countryName, data }));
    } catch (error) {
      console.error("Error fetching graph data:", error);
      throw error; // You can handle errors in your component.
    }
  }
);
const initialState: OpecState = {
  chosenCountries: ["Казахстан", "Ангола", "Нигерия"],
  currentCountry: "Казахстан",
  currentData: {
    countries_o: [],
    countries_o_plus: [],
  },
  graphDataByCountryName: {},
};

const opecSlice = createSlice({
  name: "opec",
  initialState,
  reducers: {
    setCurrentData: (state, action) => {
      const opecArr = [],
        opecPlusArr = [];
      for (const cd of action.payload) {
        if (cd.opek_type === "countries_o") {
          opecArr.push(cd);
        } else {
          opecPlusArr.push(cd);
        }
      }
      state.currentData = {
        countries_o: opecArr,
        countries_o_plus: opecPlusArr,
      };
    },
    setCurrentCountry: (state, action) => {
      state.currentCountry = action.payload;
    },
    setCountryInGraphData: (state, action) => {
      const { countryName, data } = action.payload;
      state.graphDataByCountryName[countryName] = data;
    },
    removeChosenCountry: (state, action) => {
      const arr = state.chosenCountries,
        el = action.payload;
      if (arr.includes(el)) {
        state.chosenCountries = arr.filter(
          (country: OpecCountryName) => country !== el
        );
      }
    },
    addChosenCountry: (state, action) => {
      const arr = state.chosenCountries,
        el = action.payload;
      if (!arr.includes(el)) {
        arr.push(el);
      }
    },
   
  },
});

export const {
  setCurrentData,
  setCurrentCountry,
  setCountryInGraphData,
  removeChosenCountry,
  addChosenCountry,
} = opecSlice.actions;

export default opecSlice.reducer;
