import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

// The Global Store
export const store = configureStore({
  reducer: {
    userAuth: authReducer,
  },
});
