import { configureStore } from "@reduxjs/toolkit";
import UsersDataReducer from "./slices/UsersDataSlice";


export const store = configureStore({
    reducer : {
      user : UsersDataReducer,
    },
});