import { Slice, createSlice } from "@reduxjs/toolkit";

export const statusSlice: Slice = createSlice({
  name: "status",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => { state.isLoading = action.payload },
  }
})

export const { setIsLoading } = statusSlice.actions
export default statusSlice.reducer