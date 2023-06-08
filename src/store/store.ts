import { configureStore } from "@reduxjs/toolkit";
import { Store } from "../types";
import auth from './auth'
import status from './status'

const store: Store = configureStore({
  reducer: { auth, status }
})

export default store