import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface authState {
  currentCompanyId: number;
}

const initialState: authState = {
  currentCompanyId: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentCompanyId: (state, action: PayloadAction<number>) => {
      state.currentCompanyId = action.payload;
    },
  },
});

export const { setCurrentCompanyId } = authSlice.actions;

export default authSlice.reducer;
