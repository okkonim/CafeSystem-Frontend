import { createSlice, type Slice } from "@reduxjs/toolkit"

export const authSlice: Slice = createSlice({
  name: "auth",
  initialState: { user: null, authToken: null },
  reducers: {
    setAuthToken: (state, action) => { state.authToken = action.payload },
    logIn: (state, action) => { state.user = action.payload },
    logOut: (state) => { state.user = null; state.authToken = null; console.log('logout') }
  }
})

export const { setAuthToken, logIn, logOut } = authSlice.actions
export default authSlice.reducer