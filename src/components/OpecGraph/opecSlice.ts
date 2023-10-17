import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_CONFIG } from "../../../app.config";
import { fetchCachedData } from "../../utils/fetchCachedData";

const SECONDARY_BACKEND_URL = APP_CONFIG.SECONDARY_BACKEND_URL;
export const fetchCurrentData = createAsyncThunk(
  "opec/fetchCurrentData",
  async (_, { dispatch }) => {
    try {
      const data = await fetchCachedData(
        `${SECONDARY_BACKEND_URL}/data/countries_quota`
      );

      // After fetching data, dispatch an action to update the state.
      dispatch(setCurrentData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors or dispatch an error action if needed.
    }
  }
);

type opecType = "countries_o_plus" | "countries_o";
type OpecCountryName =
  | "Юж.Судан"
  | "Бруней"
  | "Бахрейн"
  | "Судан"
  | "Нигерия"
  | "Сауд.Аравия"
  | "Кувейт"
  | "Ливия"
  | "Азербайджан"
  | "Ирак"
  | "Казахстан"
  | "Экв.Гвин"
  | "Мексика"
  | "Конго"
  | "Габон"
  | "Ангола"
  | "Алжир"
  | "Россия"
  | "Оман"
  | "Венесуэла"
  | "Иран"
  | "ОАЭ"
  | "Малайзия";
export interface CountryCurrentOpecData {
  country: OpecCountryName;
  quota_t: number;
  quota_b: number;
  opek_type: opecType;
  isIncreased: boolean;
}
interface CountryGraphDataPoint {
  opek_type: opecType;
  country: OpecCountryName;
  id: number;
  fact_b: number;
  quota_b: number;
  month: number;
  real_data: boolean;
  plan_t: number;
  plan_b: number;
  fact_t: number;
  quota_t: number;
  year: number;
  difference_b: number;
}
interface OpecState {
  chosenCountries: string[];
  currentCountry: OpecCountryName;
  currentData: CountryCurrentOpecData[];
  graphDataByCountryName: Object;
}

const initialState: OpecState = {
  chosenCountries: [],
  currentCountry: "Казахстан",
  currentData: [],
  graphDataByCountryName: {},
};

const opecSlice = createSlice({
  name: "opec",
  initialState,
  reducers: {
    setCurrentData: (state, action) => {
      state.currentData = action.payload;
    },
  },
});

export const { setCurrentData } = opecSlice.actions;

export default opecSlice.reducer;
