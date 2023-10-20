import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_CONFIG } from "../../../app.config";
import { fetchCachedData } from "../../utils/fetchCachedData";
import {
  OpecCountryName,
  CountryGraphDataPoint,
  OpecState,
  currentDataInteface,
  CountryCurrentOpecData,
} from "../../interfaces/opecSlice";
import { RootState } from "../../../store";
import { getAllCountries } from "../../utils/getAllCountries";

const SECONDARY_BACKEND_URL = APP_CONFIG.SECONDARY_BACKEND_URL;
export const fetchCurrentData = createAsyncThunk(
  "opec/fetchCurrentData",
  async (_, { dispatch }) => {
    try {
      const data = (await fetchCachedData(
        `${SECONDARY_BACKEND_URL}/calculate_opek_countries_quota`
      )) as CountryCurrentOpecData[];
      const newData = [];
      for (const countryData of data) {
        console.log(!(countryData.quota_b && countryData.quota_t));
        if (!(countryData.quota_b && countryData.quota_t)) {
          // dispatch(removeValidCountry(countryData.country));
        } else {
          newData.push(countryData);
        }
      }
      dispatch(setCurrentData(newData));
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
      const data: CountryGraphDataPoint[] = await fetchCachedData<
        CountryGraphDataPoint[]
      >(`${SECONDARY_BACKEND_URL}/calculate_opek_by_country/${countryName}`);
      if (data) {
        data.sort((a, b) => {
          if (a.year === b.year) {
            return a.month - b.month; // If years are equal, sort by months
          } else {
            return a.year - b.year; // Sort by years
          }
        });
        dispatch(setCountryInGraphData({ countryName, data }));
      } else {
        // dispatch(removeValidCountry(countryName));
      }
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
  validCountries: getAllCountries(),
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
    removeValidCountry: (state, action) => {
      const arr = state.validCountries,
        el = action.payload;
      if (arr.includes(el)) {
        state.validCountries = arr.filter(
          (country: OpecCountryName) => country !== el
        );
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
  removeValidCountry,
} = opecSlice.actions;

export default opecSlice.reducer;
