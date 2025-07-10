import { createSlice, type Slice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStore } from '../types';

export const authSlice: Slice<AuthStore> = createSlice({
  name: "auth",
  initialState: { user: null, authToken: null },
  reducers: {
    setAuthToken: (state: AuthStore, action: PayloadAction<string | null>) => { state.authToken = action.payload },
    logIn: (state: AuthStore, action: PayloadAction<any>) => { state.user = action.payload },
    logOut: (state: AuthStore) => { state.user = null; state.authToken = null; }
  }
})

export const { setAuthToken, logIn, logOut } = authSlice.actions;
export default authSlice.reducer;