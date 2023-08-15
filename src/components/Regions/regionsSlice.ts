import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegionsState {
  selectedRegion: string;
  displayedRegions: string[];
}

const initialState: RegionsState = {
  selectedRegion: "",
  displayedRegions: [],
};

const regionsSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {
    selectRegion(state, action: PayloadAction<string>) {
      state.selectedRegion = action.payload;
    },
    setDisplayedRegions(state, action: PayloadAction<string[]>) {
      state.displayedRegions = action.payload;
    },
  },
});

export const { selectRegion, setDisplayedRegions } = regionsSlice.actions;

export default regionsSlice.reducer;
