import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RegionsState {
  selectedRegion: string
}

const initialState: RegionsState = {
  selectedRegion: ''
}

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    selectRegion(state, action: PayloadAction<string>) {
      state.selectedRegion = action.payload
    },
  },
})

export const { selectRegion } = regionsSlice.actions

export default regionsSlice.reducer
